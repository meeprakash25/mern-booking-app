import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import * as apiClient from "../api-client"
import type { HotelListApiResponse } from "../types/ApiResponse"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"
import { LoadingHotels, Error, NoDataFound } from "../components/LoadingStatus"

const MyHotels = () => {
  const {
    data: hotelData,
    isLoading,
    error,
    isError,
  } = useQuery<HotelListApiResponse>({
    queryKey: ["fetchMyHotels"],
    queryFn: apiClient.fetchMyHotels,
    refetchOnWindowFocus: false,
    retry: false,
  })

  return (
    <>
      <div className="flex justify-between">
        <span className="text-3xl font-bold">My Hotels</span>
        <Link
          to="/add-hotel"
          className={`bg-blue-700 px-10 sm:px-20 py-2 font-bold rounded text-white whitespace-nowrap hover:bg-blue-800 active:bg-blue-700`}>
          Add Hotel
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5">
        {isLoading ? (
          <LoadingHotels />
        ) :  isError ? <Error message={error.message} /> : (hotelData?.data && hotelData?.data.length > 0) ? (
          hotelData.data.map((hotel, index) => (
            <div
              key={index}
              className="flex flex-col justify-between border border-blue-300 bg-blue-100 hover:bg-blue-200 rounded-lg p-8 gap-5 shadow-sm hover:shadow-lg">
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />${hotel.pricePerNight} per night
                </div>
                <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-gray-400 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} Star
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className={`bg-blue-700 px-4 py-2 rounded text-white whitespace-nowrap hover:bg-blue-800 active:bg-blue-700`}>
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    </>
  )
}

export default MyHotels
