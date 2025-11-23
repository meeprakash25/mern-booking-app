import express, { Request, Response } from "express"
import Hotel from "../models/hotel"
import { body, param, validationResult } from "express-validator"
import Stripe from "stripe"
import verifyToken from "../middleware/auth"
import { BookingType } from "../shared/types/types"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated").limit(8)
    res.status(200).json({ message: "Hotels fetched successfully", data: hotels })
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({ message: "Something went wrong" })
  }
})

router.post(
  "/:hotelId/bookings",
  verifyToken,
  [
    body("firstName").notEmpty().withMessage("First Name is required"),
    body("lastName").notEmpty().withMessage("Last Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string)
      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment intent not found" })
      }

      if (paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req.userId) {
        return res.status(400).json({ message: "Payment intent mistatch" })
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ message: `Payment intent not succeeded. Status: ${paymentIntent.status}` })
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      }

      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId },
        {
          $push: { bookings: newBooking },
        },
        { runValidators: true }
      )

      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" })
      }

      await hotel.save()

      return res.status(200).json({ message: "Hotel booked successfully" })
    } catch (error) {
      console.log("Error: ", error)
      res.status(500).json({ message: "Failed to save the booking" })
    }
  }
)

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

router.get(
  "/:hotelId",
  [param("hotelId").notEmpty().withMessage("Hotel id is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const hotelId = req.params.hotelId.toString()
    try {
      const hotel = await Hotel.findById(hotelId)
      res.status(200).json({ message: "Hotel fetched successfully", data: hotel })
    } catch (error) {
      console.error("Error in hotel detail route:", error)
      res.status(500).json({ message: "Something went wrong" })
    }
  }
)

router.post("/:hotelId/bookings/payment-intent", verifyToken, async (req: Request, res: Response) => {
  try {
    const { numberOfNights } = req.body
    const hotelId = req.params.hotelId

    const hotel = await Hotel.findById(hotelId)

    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" })
    }

    const totalCost = hotel.pricePerNight * numberOfNights

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "USD",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    })

    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" })
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    }

    return res.status(200).json({ message: "Payment processed successfully", data: response })
  } catch (error) {
    console.error("Error in payment-intent route:", error)
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router
