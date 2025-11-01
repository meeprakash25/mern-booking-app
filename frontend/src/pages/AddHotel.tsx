import { useMutation } from "@tanstack/react-query"
import ManageHotelForm from "../forms/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from "../api-client"

const AddHotel = () => {
  const {showToast} = useAppContext()
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: (data) => {
      showToast({ message: data.message, type: "SUCCESS" })
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