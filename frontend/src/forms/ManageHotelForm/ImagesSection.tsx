import React from "react"
import { useFormContext } from "react-hook-form"
import type { HotelFormData } from "../ManageHotelForm"

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length
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
