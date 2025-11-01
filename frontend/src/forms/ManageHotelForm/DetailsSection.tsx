import React from "react"
import { useFormContext } from "react-hook-form"
import type { HotelFormData } from "../ManageHotelForm"

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <h1 className="text-2xl font-bold">Basic Details</h1>
      <label htmlFor="name" className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          id="name"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "Name field is required" })}
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </label>
      <div className="flex gap-4">
        <label htmlFor="city" className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            id="city"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "City field is required" })}
          />
          {errors.city && <span className="text-red-500">{errors.city.message}</span>}
        </label>
        <label htmlFor="country" className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            id="country"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "Country field is required" })}
          />
          {errors.country && <span className="text-red-500">{errors.country.message}</span>}
        </label>
      </div>
      <label htmlFor="country" className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={8}
          id="description"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "Description field is required" })}
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </label>
      <label htmlFor="country" className="text-gray-700 text-sm font-bold flex-1 w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          id="pricePerNight"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "Price per night field is required" })}
        />
        {errors.pricePerNight && <span className="text-red-500">{errors.pricePerNight.message}</span>}
      </label>
      <label htmlFor="country" className="text-gray-700 text-sm font-bold flex-1 w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
              required: "Star rating field is required"
          }) }
          className="border rounded w-full p-2 text-gray-700"
        >
          <option key={0} value="" className="text-sm font-bold">
            Select a Rating
          </option>
          { [1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
        {errors.starRating && <span className="text-red-500">{errors.starRating.message}</span>}
      </label>
    </div>
  )
}

export default DetailsSection
