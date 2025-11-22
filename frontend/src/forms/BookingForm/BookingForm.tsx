import { useForm } from "react-hook-form"
import { type PaymentIntentResponse, type UserType } from "../../../../backend/src/shared/types/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import type { StripeCardElement } from "@stripe/stripe-js"
import { useSearchContext } from "../../contexts/SearchContext"
import { Link, useParams } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import * as apiClient from "../../api-client"
import { useAppContext } from "../../contexts/AppContext"
import { FiCommand } from "react-icons/fi"

type Props = {
  currentUser: UserType
  paymentIntent: PaymentIntentResponse
}

export type BookingFormData = {
  firstName: string
  lastName: string
  email: string
  adultCount: number
  childCount: number
  checkOut: string
  checkIn: string
  hotelId: string
  paymentIntentId: string
  totalCost: number
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe()
  const elements = useElements()
  const { hotelId } = useParams()
  const { showToast } = useAppContext()

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: apiClient.createRoomBooking,
    onSuccess: async (data) => {
      showToast({ message: data?.message || "Booking Saved!", type: "SUCCESS" })
    },
    onError: (error: Error) => {
      showToast({ message: error?.message, type: "ERROR" })
    },
  })

  const search = useSearchContext()

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.data.totalCost,
      paymentIntentId: paymentIntent.data.paymentIntentId,
    },
  })

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return
    }
    const result = await stripe.confirmCardPayment(paymentIntent.data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    })
    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent?.id ?? "" })
    }
    showToast({ message: result.error?.message || "Error booking hotel", type: "ERROR" })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-2">
        <span className="text-3xl font-bold">Confirm Your Details</span>
        <div className="grid grid-cols-2 gap-6">
          <label htmlFor="firstName" className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              id="firstName"
              type="text"
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
              readOnly
              disabled
              {...register("firstName")}
            />
          </label>
          <label htmlFor="lastName" className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              id="lastName"
              type="text"
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
              readOnly
              disabled
              {...register("lastName")}
            />
          </label>
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="email" className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              id="email"
              type="text"
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Price Summery</h2>
          <div className="bg-blue-200 p-4 rounded-md">
            <div className="font-semibold text-lg">Total Cost: ${paymentIntent.data.totalCost.toFixed(2)}</div>
            <div className="text-xs">Includes taxes and charges</div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2">
          <div>
            <Link
              to={`/detail/${hotelId}`}
              type="button"
              className="flex items-center justify-center text-blue-600 px-30 py-2 font-bold bg-gray-200 hover:bg-gray-300 active:bg-gray-300 whitespace-nowrap rounded">
              Cancel
            </Link>
          </div>
          <div className="flex justify-end">
            <button
              disabled={isPending}
              type="submit"
              className={`bg-blue-700 px-30 py-2 font-bold rounded text-white hover:bg-blue-800 active:bg-blue-700 w-full md:w-auto ${
                isPending ? " disabled" : ""
              }`}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <span>Please wait</span>
                  <FiCommand className="animate-spin font-small" />
                </div>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default BookingForm
