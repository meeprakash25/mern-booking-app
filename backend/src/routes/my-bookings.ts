import express, {Request, Response} from "express"
import verifyToken from "../middleware/auth"
import Hotel from "../models/hotel"
import { HotelType } from "../shared/types/types"

const router = express.Router()

// /api/my-bookings

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: {$elemMatch: {userId: req.userId}}
    })

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking)=>booking.userId === req.userId 
      )
      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings
      }

      return hotelWithUserBookings
    })

    res.status(200).json({message:"My bookings fetched successfully", data: results})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Something went wrong"})
  }
})

export default router