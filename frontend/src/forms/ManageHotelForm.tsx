import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./ManageHotelForm/DetailsSection"
import TypeSection from "./ManageHotelForm/TypeSection"
import FacilitiesSection from "./ManageHotelForm/FacilitiesSection"
import GuestsSection from "./ManageHotelForm/GuestsSection"
import ImagesSection from "./ManageHotelForm/ImagesSection"
import { Link } from "react-router-dom"
import type { HotelType } from "../../../backend/src/shared/types/HotelType"
import { useEffect } from "react"
import { FiCommand } from "react-icons/fi"

export type HotelFormData = {
  hotelId: string
  name: string
  city: string
  country: string
  description: string
  type: string
  pricePerNight: number
  starRating: number
  facilities: string[]
  imageFiles: FileList
  imageUrls: string[]
  adultCount: number
  childCount: number
}

type Props = {
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
  hotel?: HotelType
}

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>()
  const { handleSubmit, reset } = formMethods

  useEffect(() => {
    reset(hotel)
  }, [hotel, reset])

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData()
    if (hotel) {
      formData.append("hotelId", hotel._id)
    }
    formData.append("name", formDataJson.name)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)
    formData.append("description", formDataJson.description)
    formData.append("type", formDataJson.type)
    formData.append("pricePerNight", formDataJson.pricePerNight.toString())
    formData.append("starRating", formDataJson.starRating.toString())
    formData.append("imageFiles", formDataJson.imageFiles.toString())
    formData.append("adultCount", formDataJson.adultCount.toString())
    formData.append("childCount", formDataJson.childCount.toString())

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility)
    })

    if(formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url)
      })
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile)
    })

    onSave(formData)
  })

  return (
    <FormProvider { ...formMethods }>
      <h1 className="text-3xl font-bold mb-4">Add Hotel</h1>
      <form className="flex flex-col gap-10 border border-gray-300 rounded-lg p-5 sm:p-10 shadow-lg" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <div>
            <Link
              to="/my-hotels"
              type="button"
              className="flex items-center justify-center text-blue-600 px-30 py-2 font-bold bg-gray-200 hover:bg-gray-300 active:bg-gray-300 whitespace-nowrap rounded">
              Cancel
            </Link>
          </div>
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className={`bg-blue-700 px-30 py-2 font-bold rounded text-white hover:bg-blue-800 active:bg-blue-700 w-full md:w-auto ${
                isLoading ? " disabled" : ""
              }`}>
              { isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Saving</span><FiCommand className="animate-spin font-small" />
                </div>
              ) : "Save"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm
