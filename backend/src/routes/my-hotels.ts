import express, { Request, Response } from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import Hotel from "../models/hotel"
import { HotelType } from "../shared/types/HotelType"
import verifyToken from "../middleware/auth"
import { body } from "express-validator"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
})

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    body("imageUrls").notEmpty().isArray().withMessage("Name is required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[]
      const newHotel: HotelType = req.body

      const imageUrls = await uploadImages(imageFiles)

      newHotel.imageUrls = imageUrls
      newHotel.lastUpdated = new Date()
      newHotel.userId = req.userId

      const hotel = new Hotel(newHotel)
      const response = await hotel.save()

      res.status(200).json({ message: "Hotel added successfully", data: { hotel: response } })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Something went wrong" })
    }
  }
)

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId })
    res.status(200).json({ message: "Hotels fetched successfully", data: [...hotels] })
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" })
  }
})

router.get("/:hotelId", verifyToken, async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId.toString()
  try {
    let hotel = await Hotel.findOne({
      _id: hotelId,
      userId: req.userId,
    })
    if (!hotel) {
      throw new Error("Hotel does not exist")
    }
    res.status(200).json({ message: "Hotel fetched successfully", data: hotel })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error fetching hotel"
    res.status(500).json({ message: errorMessage })
  }
})

router.put(
  "/:hotelId",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    body("imageUrls").notEmpty().isArray().withMessage("Name is required"),
  ],
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body
      updatedHotel.lastUpdated = new Date()

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      )
      if (!hotel) {
        throw new Error("Hotel does not exist")
      }

      const imageFiles = req.files as Express.Multer.File[]

      const updatedImageUrls = await uploadImages(imageFiles)

      hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])]

      await hotel.save()

      res.status(201).json({ message: "Hotel updated successfully", data: { hotel: hotel } })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong"
      res.status(500).json({ message: errorMessage })
    }
  }
)

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64")
    let dataUri = "data:" + image.mimetype + ";base64," + b64
    const res = await cloudinary.uploader.upload(dataUri)
    return res.url
  })

  const imageUrls = await Promise.all(uploadPromises)
  return imageUrls
}

export default router
