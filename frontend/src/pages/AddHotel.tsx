import { useMutation, useQueryClient } from "@tanstack/react-query"
import ManageHotelForm from "../forms/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from "../api-client"
import { useNavigate } from "react-router-dom"
import type { ApiResponse } from "../types/ApiResponse"

const AddHotel = () => {
  const { showToast } = useAppContext()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation<ApiResponse, Error, FormData>({
    mutationFn: apiClient.addMyHotel,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fetchMyHotels"] })
      showToast({ message: data.message, type: "SUCCESS" })
      navigate("/my-hotels")
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" })
    },
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }

  return (
    <ManageHotelForm onSave={ handleSave } isLoading={isPending} />
  )
}

export default AddHotel