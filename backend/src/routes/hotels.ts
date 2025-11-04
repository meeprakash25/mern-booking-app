import express, { Request, Response } from "express"
import Hotel from "../models/hotel"

const router = express.Router()

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query)

    let sortOption = {}
    switch (req.query.sortOption) {
      case "starRatingAsc":
        sortOption = { starRating: 1 }
        break
      case "starRatingDesc":
        sortOption = { starRating: -1 }
        break
      case "pricePerNightAsc":
        sortOption = { pricePerNight: 1 }
        break
      case "pricePerNightDesc":
        sortOption = { pricePerNight: -1 }
    }

    const pageSize = 5
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1")
    const skip = (pageNumber - 1) * pageSize
    const hotels = await Hotel.find(query).sort(sortOption).skip(skip).limit(pageSize)
    const total = await Hotel.countDocuments(query)
    const response = {
      hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    }

    res.status(200).json({ message: "Hotels fetched successfully", data: response })
  } catch (error) {
    console.error("Error in /search route:", error)
    res.status(500).json({ message: "Something went wrong" })
  }
})

const constructSearchQuery = (queryParams: any) => {
  let constructQuery: any = {}
  if (queryParams.destination) {
    constructQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ]
  }

  if (queryParams.adultCount && parseInt(queryParams.adultCount) !== 1) {
    constructQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    }
  }

  if (queryParams.childCount && parseInt(queryParams.childCount) !== 0) {
    constructQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    }
  }

  if (queryParams.facilities) {
    constructQuery.facilities = {
      $all: Array.isArray(queryParams.facilities) ? queryParams.facilities : [queryParams.facilities],
    }
  }

  if (queryParams.types) {
    constructQuery.type = {
      $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
    }
  }

  if (queryParams.stars) {
    constructQuery.starRating = {
      $in: Array.isArray(queryParams.stars) ? queryParams.stars : [queryParams.stars],
    }
  }

  if (queryParams.maxPrice) {
    constructQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice),
    }
  }

  return constructQuery
}

export default router
