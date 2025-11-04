import DatePicker from "react-datepicker"
import { useForm } from "react-hook-form"
import { useSearchContext } from "../../contexts/SearchContext"
import { FiCommand } from "react-icons/fi"
import { useAppContext } from "../../contexts/AppContext"
import { useLocation, useNavigate } from "react-router-dom"

type Props = {
  hotelId: string
  pricePerNight: number
}

type GuestInfoFormData = {
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
}

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext()
  const { isLoggedIn } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      childCount: search.childCount,
      adultCount: search.adultCount,
    },
  })
  const checkIn = watch("checkIn")
  const checkOut = watch("checkOut")
  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  const isPending = false

  const onSignInClick = (formData: GuestInfoFormData) => {
    search.saveSearchValues("", formData.checkIn, formData.checkOut, formData.adultCount, formData.childCount)
    navigate("/sign-in", { state: { from: location } })
  }

  const onSubmit = (formData: GuestInfoFormData) => {
    search.saveSearchValues("", formData.checkIn, formData.checkOut, formData.adultCount, formData.childCount)
    navigate(`/hotel/${hotelId}/booking`)
  }

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4 rounded">
      <h3 className="text-md font-bold">${pricePerNight} per night</h3>
      <form
        action=""
        onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}
        className="flex flex-col gap-4">
        <div>
          <DatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in date"
            className="w-1/2 min-w-full bg-white p-2 rounded focus:outline-none"
            wrapperClassName="min-w-full"
          />
          {errors.checkIn && <span className="text-red-700 font-semibold text-sm">{errors.checkIn.message}</span>}
        </div>

        <div>
          <DatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-out date"
            className="w-1/2 min-w-full bg-white p-2 rounded focus:outline-none"
            wrapperClassName="min-w-full"
          />
          {errors.checkOut && <span className="text-red-700 font-semibold text-sm">{errors.checkOut.message}</span>}
        </div>

        <div className="flex items-center bg-white rounded px-2 h-full col-span-2">
          <label className="items-center flex flex-1">
            Adults:
            <input
              type="number"
              className="w-full p-1 gap-1 focus:outline-none font-bold"
              min={1}
              max={20}
              {...register("adultCount", {
                required: "Adult count field is required",
                min: {
                  value: 1,
                  message: "There must be at least one adult",
                },
                valueAsNumber: true,
              })}
            />
            {errors.adultCount && (
              <span className="text-red-700 font-semibold text-sm">{errors.adultCount.message}</span>
            )}
          </label>
          <label className="items-center flex flex-1">
            Children:
            <input
              type="number"
              className="w-full p-1 focus:outline-none font-bold"
              min={0}
              max={20}
              {...register("childCount", {
                required: "Child count field is required",
                valueAsNumber: true,
              })}
            />
          </label>
          {errors.childCount && <span className="text-red-700 font-semibold text-sm">{errors.childCount.message}</span>}
        </div>

        <div className="flex flex-1">
          {isLoggedIn ? (
            <button
              disabled={isPending}
              type="submit"
              className={`bg-blue-700 w-full px-4 py-2 font-semibold text-lg rounded text-white whitespace-nowrap hover:bg-blue-800 active:bg-blue-700 ${
                isPending ? "disabled" : ""
              }`}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <span>Please wait</span>
                  <FiCommand className="animate-spin font-small" />
                </div>
              ) : (
                "Book now"
              )}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-700 w-full px-4 py-2 font-semibold text-lg rounded text-white whitespace-nowrap hover:bg-blue-800 active:bg-blue-700 text-center">
              {"Sign in to book"}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default GuestInfoForm
