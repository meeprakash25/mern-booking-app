import { useFormContext } from "react-hook-form"
import type { HotelFormData } from "../ManageHotelForm"

const ImagesSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>()

  const existingImageUrls = watch("imageUrls")

  const handleImageDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
    event.preventDefault()
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid md:grid-col-3 lg:grid-cols-6 gap-4 h-auto">
            {existingImageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} alt="hotel-image" className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleImageDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-100 opacity-0 group-hover:opacity-80 group-active:opacity-80 text-white underline">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (existingImageUrls?.length || 0)
              if (totalLength > 6) {
                return "Total number images cannot be more than 6"
              }

              if (totalLength === 0) {
                return "Please choose at least one image"
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>}
    </div>
  )
}

export default ImagesSection
