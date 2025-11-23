import React from "react"
import type { HotelType } from "../../../backend/src/shared/types/types"
import { FiCommand } from "react-icons/fi"

type Props = {
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
  numberOfNights: number
  hotel?: HotelType
  hotelLoading: boolean
  hotelError: unknown
  isHotelError: boolean
}

const BookingDetailSummery = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
  hotelLoading,
  hotelError,
  isHotelError,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>

      {hotelLoading ? (
        <LoadingData message="Loading booking details" />
      ) : isHotelError || !hotel ? (
        <Error message="Error loading booking details" />
      ) : (
        <div>
          <div className="border-b border-slate-300 py-2">
            Location
            <div className="font-bold">{` ${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}</div>
          </div>
          <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
              Check-in
              <div className="font-bold"> {checkIn.toDateString()}</div>
            </div>
            <div>
              Check-out
              <div className="font-bold"> {checkOut.toDateString()}</div>
            </div>
          </div>
          <div className="border-b border-slate-300 py-2">
            Total Length of Stay
            <div className="font-bold">{numberOfNights} nights</div>
          </div>
          <div className="">
            Guests
            <div className="font-bold">
              {adultCount} adults & {childCount} children
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

type Prop = {
  message?: string | undefined
}

const LoadingData = ({ message }: Prop) => {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <div className="flex items-center gap-2 font-bold text-lg">
        <span className="">Loading</span>
        <FiCommand className="animate-spin font-small" />
      </div>
      <p className="text-gray-500">{message || "Please wait for a while"}</p>
    </div>
  )
}

const Error = ({ message }: Prop) => {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <h2 className="text-lg font-bold">Error</h2>
      <p className="text-gray-500">{message || "There has been an error loading the data"}</p>
    </div>
  )
}

export default BookingDetailSummery
