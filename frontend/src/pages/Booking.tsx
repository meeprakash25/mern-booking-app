import { useQuery } from "@tanstack/react-query"
import * as apiClient from "../api-client"
import BookingForm from "../forms/BookingForm/BookingForm"
import { useSearchContext } from "../contexts/SearchContext"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import BookingDetailSummery from "../components/BookingDetailSummery"
import type { HotelByIdApiResponse } from "../types/ApiResponse"
import { Elements } from "@stripe/react-stripe-js"
import { useAppContext } from "../contexts/AppContext"

const Booking = () => {
  const { stripePromise } = useAppContext()
  const search = useSearchContext()
  const { hotelId } = useParams()

  const [numberOfNights, setNumberOfNights] = useState<number>(0)

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24)
      setNumberOfNights(Math.ceil(nights))
    }
  }, [search.checkIn, search.checkOut])

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent", hotelId, numberOfNights],
    queryFn: () => apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
    retry: false,
    enabled: !!hotelId && numberOfNights > 0,
    refetchOnWindowFocus: false,
  })

  const {
    data: hotel,
    isLoading,
    isFetching,
    isRefetching,
    error,
    isError,
  } = useQuery<HotelByIdApiResponse>({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: () => apiClient.fetchHotelById((hotelId as string) || ""),
    retry: false,
    enabled: !!hotelId,
    refetchOnWindowFocus: false,
  })

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: apiClient.fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  })

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-2">
      {hotel && (
        <BookingDetailSummery
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel.data}
        />
      )}
      {currentUser && paymentIntentData && (
        <Elements stripe={stripePromise} options={{ clientSecret: paymentIntentData.data.clientSecret }}>
          <BookingForm currentUser={ currentUser.data } paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  )
}

export default Booking
