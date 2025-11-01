import express, { Request, Response } from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import Hotel, { HotelType } from "../models/hotel"
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

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64")
        let dataUri = "data:" + image.mimetype + ";base64," + b64
        const res = await cloudinary.uploader.upload(dataUri)
        return res.url
      })

      const imageUrls = await Promise.all(uploadPromises)

      newHotel.imageUrls = imageUrls
      newHotel.lastUpdated = new Date()
      newHotel.userId = req.userId

      const hotel = new Hotel(newHotel)
      const response = await hotel.save()

      res.status(201).json({ message: "Hotel added successfully", data: { hotel: response } })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Something went wrong" })
    }
  }
)

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId })
    res.status(200).json({ message: "Hotels fetched successfully", data:  [...hotels ] })
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" })
  }
})

export default router
