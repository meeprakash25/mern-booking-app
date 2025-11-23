import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import ManageHotelForm from "../forms/ManageHotelForm"
import type { ApiResponse, HotelByIdApiResponse } from "../types/ApiResponse"
import { useAppContext } from "../contexts/AppContext"
import { FiCommand } from "react-icons/fi"

const EditHotel = () => {
  const { hotelId } = useParams()
  const { showToast } = useAppContext()
  const queryClient = useQueryClient()
  const navigator = useNavigate()

  const {
    data: hotel,
    isLoading: isFetchingHotel,
    isError,
    error,
  } = useQuery<HotelByIdApiResponse>({
    queryKey: ["fetchMyHotelById", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    retry: false,
    enabled: !!hotelId, // enable only if hotelId is present
    refetchOnWindowFocus: false,
  })

  const { mutate, isPending: isUpdatinggHotel } = useMutation<ApiResponse, Error, FormData>({
    mutationFn: (hotelFormData: FormData) => apiClient.updateMyHotelById(hotelFormData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyHotels"] })
      queryClient.invalidateQueries({ queryKey: ["fetchMyHotelById", hotelId] })
      queryClient.invalidateQueries({ queryKey: ["createPaymentIntent", hotelId] })
      showToast({ message: data.message, type: "SUCCESS" })
      navigator("/my-hotels")
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" })
    },
  })

  if (isFetchingHotel) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center gap-2">
          <span className="font-bold font-2xl">Loading</span>
          <FiCommand className="animate-spin font-small" />
        </div>
        <p className="text-gray-500">Please wait while we load the hotel details</p>
      </div>
    )
  }

  if (!hotel?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold">Hotel not found</h2>
        <p className="text-gray-500">The hotel you are looking for does not exist</p>
      </div>
    )
  }

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return <ManageHotelForm onSave={handleSave} hotel={hotel.data} isLoading={isUpdatinggHotel} />
}

export default EditHotel
