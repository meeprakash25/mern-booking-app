import { useQuery } from "@tanstack/react-query"
import * as apiClient from "../api-client"
import type { MyBookingsApiResponse } from "../types/ApiResponse"
import { Error, LoadingHotels, NoDataFound } from "../components/LoadingStatus"

const MyBookings = () => {
  const {
    data: hotelData,
    isLoading,
    error,
    isError,
  } = useQuery<MyBookingsApiResponse>({
    queryKey: ["myBookings"],
    queryFn: apiClient.myBookings,
    retry: false,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {isLoading ? (
        <LoadingHotels message="Please wait while we load your bookings" />
      ) : isError ? (
        <Error message={error.message} />
      ) : hotelData && Array.isArray(hotelData?.data) && hotelData?.data.length > 0 ? (
        hotelData.data.map((hotel) => (
          <div
            key={hotel._id}
            className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-blue-300 bg-blue-100 hover:bg-blue-200 rounded-lg p-8 gap-5 shadow-md hover:shadow-lg">
            <div className="lg:w-full lg:h-[250px]">
              <img src={hotel.imageUrls[0]} alt="" className="w-full h-full object-center rounded-md" />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
              <div className="text-2xl font-bold">
                {hotel.name}
                <div className="text-xl font-semibold">
                  {hotel.city}, {hotel.country}
                </div>
              </div>
              {hotel.bookings.map((booking) => (
                <div key={booking._id}>
                  <div>
                    <span className="font-bold mr-2">Dates: </span>
                    <span>
                      {new Date(booking.checkIn).toDateString()}-{new Date(booking.checkOut).toDateString()}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold mr-2">Guests: </span>
                    <span className="font-bold mr-2">
                      <span>
                        {booking.adultCount} adults & {booking.childCount} children
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <NoDataFound />
      )}
    </div>
  )
}

export default MyBookings
