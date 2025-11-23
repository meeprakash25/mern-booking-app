import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import type { HotelByIdApiResponse } from "../types/ApiResponse"
import type { HotelType } from "../../../backend/src/shared/types/types"
import { AiFillStar } from "react-icons/ai"
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm"
import { LoadingData, Error } from "../components/LoadingStatus"

const HotelDetail = () => {
  const { hotelId } = useParams()
  const {
    data: responseData,
    isLoading,
    error,
    isError,
  } = useQuery<HotelByIdApiResponse>({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: () => apiClient.fetchHotelById((hotelId as string) || ""),
    retry: false,
    enabled: !!hotelId, // enable it only if hotelId is present
    refetchOnWindowFocus: false,
  })

  const hotelData = responseData?.data as HotelType

  return (
    <>{isLoading ? <LoadingData /> : isError ? <Error message={error.message} /> : <HotelDetails {...hotelData} />}</>
  )
}

const HotelDetails = (hotelData: HotelType) => {
  return (
    <div className="space-y-4">
      {/* Header section */}
      <div>
        <span className="flex">
          {Array.from({ length: hotelData.starRating }).map((key, index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-2xl font-bold">{hotelData.name}</h1>
      </div>

      {/* Images section */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6 gap-4">
        {hotelData.imageUrls.map((image, index) => (
          <div key={image + index} className="w-auto max-h-[300px]">
            <img src={image} alt={hotelData.name} className="rounded-md w-full h-full object-cover object-center" />
          </div>
        ))}
      </div>

      {/* Facilities section */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {hotelData.facilities.map((facility, index) => (
          <div
            key={facility + index}
            className="border border-blue-200 p-2 rounded-lg font-bold text-xs whitespace-nowrap text-center">
            {facility}
          </div>
        ))}
      </div>

      {/* Description & Guest Info Form section */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line mb-3">{hotelData.description}</div>
        <div className="h-fit">
          <GuestInfoForm pricePerNight={hotelData.pricePerNight} hotelId={hotelData._id} />
        </div>
      </div>
    </div>
  )
}

export default HotelDetail
