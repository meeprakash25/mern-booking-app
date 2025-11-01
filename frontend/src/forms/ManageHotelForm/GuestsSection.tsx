import React from "react"
import { useFormContext } from "react-hook-form"
import type { HotelFormData } from "../ManageHotelForm"

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()
  return (
    <div>
      <h2 className="text-2xl font-bold gap-10">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300 rounded-sm">
        <label htmlFor="adultCount" className="text-gray-700 text-sm font-semibold">
          Number of Adults
          <input
            min={1}
            id="adultCount"
            type="number"
            className="border rounded w-full p-2 px-3 font-normal"
            {...register("adultCount", {
              required: "Number of adult field is required",
            })}
          />
          {errors.adultCount && <span className="text-red-500 text-sm font-bold">{errors.adultCount.message}</span>}
        </label>
        <label htmlFor="childCount" className="text-gray-700 text-sm font-semibold">
          Number of Children
          <input
            id="childCount"
            min={0}
            type="number"
            className="border rounded w-full p-2 px-3 font-normal"
            {...register("childCount", {
              required: "Number of children field is required",
            })}
          />
          {errors.childCount && <span className="text-red-500 text-sm font-bold">{errors.childCount.message}</span>}
        </label>
      </div>
    </div>
  )
}

export default GuestsSection
