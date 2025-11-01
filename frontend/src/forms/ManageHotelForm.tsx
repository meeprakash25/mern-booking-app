import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./ManageHotelForm/DetailsSection"
import TypeSection from "./ManageHotelForm/TypeSection"
import FacilitiesSection from "./ManageHotelForm/FacilitiesSection"
import GuestsSection from "./ManageHotelForm/GuestsSection"
import ImagesSection from "./ManageHotelForm/ImagesSection"
import { Link } from "react-router-dom"

export type HotelFormData = {
  name: string
  city: string
  country: string
  description: string
  type: string
  pricePerNight: number
  starRating: number
  facilities: string[]
  imageFiles: FileList
  adultCount: number
  childCount: number
}

type Props = {
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
}

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>()
  const { handleSubmit } = formMethods

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    console.log(formDataJson)
    const formData = new FormData()
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

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile)
    })

    onSave(formData)
  })

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <div className="flex justify-between">
          <div>
            <Link
              to="/sign-in"
              type="button"
              className="flex items-center text-blue-600 px-3 py-2 font-bold bg-gray-200 hover:bg-gray-300 active:bg-gray-300 whitespace-nowrap rounded">
              Cancel
            </Link>
          </div>
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className={`bg-blue-700 px-4 py-2 rounded text-white hover:bg-blue-800 active:bg-blue-700 ${
                isLoading ? " disabled" : ""
              }`}>
              {isLoading ? "Saving ..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm
