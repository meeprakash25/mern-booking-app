import type { RegisterFormData } from "./pages/Register"
import type { ApiResponse, HotelByIdApiResponse, HotelListApiResponse } from "./types/ApiResponse"
import type { SignInFormData } from "./pages/SignIn"
import type { HotelSearchResponseType, PaymentIntentResponse } from "../../backend/src/shared/types/types"
import type { BookingFormData } from "./forms/BookingForm/BookingForm"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  })
  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody
}

export const register = async (formData: RegisterFormData): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody
}

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  })
  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error("Token invalid")
  }
  return responseBody
}

export const signIn = async (formData: SignInFormData): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
  return responseBody
}

export const signOut = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error("Error during logout")
  }

  return responseBody
}

export const addMyHotel = async (hotelFormData: FormData): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  })

  if (!response.ok) {
    throw new Error("Failed to add hotel")
  }

  return await response.json()
}

export const fetchMyHotels = async (): Promise<HotelListApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error("Error fetching hotels")
  }

  return responseBody
}

export const fetchMyHotelById = async (hotelId: string): Promise<HotelByIdApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error("Error fetching hotel")
  }

  return responseBody
}

export const updateMyHotelById = async (hotelFromData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFromData.get("hotelId")}`, {
    method: "PUT",
    body: hotelFromData,
    credentials: "include",
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to update hotel")
  }

  return responseBody
}

export type SearchParamsType = {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childCount?: string
  page?: string
  facilities?: string[]
  types?: string[]
  stars?: string[]
  maxPrice?: string
  sortOption?: string
}

export const searchHotels = async (searchParams: SearchParamsType): Promise<HotelSearchResponseType> => {
  const queryParams = new URLSearchParams()
  queryParams.append("destination", searchParams.destination || "")
  queryParams.append("checkIn", searchParams.checkIn || "")
  queryParams.append("checkOut", searchParams.checkOut || "")
  queryParams.append("adultCount", searchParams.adultCount || "")
  queryParams.append("childCount", searchParams.childCount || "")
  queryParams.append("page", searchParams.page || "")

  queryParams.append("maxPrice", searchParams.maxPrice || "")
  queryParams.append("sortOption", searchParams.sortOption || "")

  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility)
  })

  searchParams.types?.forEach((type) => {
    queryParams.append("types", type)
  })

  searchParams.stars?.forEach((star) => {
    queryParams.append("stars", star)
  })

  const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message || "Failed to fetch hotels")
  }

  return responseBody
}

export const fetchHotelById = async (hotelId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)
  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error("Error fetching hotels")
  }

  return responseBody
}

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ numberOfNights }),
    headers: {
      "Content-type": "application/json",
    },
  })

  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error("Error fetching payment intent")
  }

  return responseBody
}

export const createRoomBooking = async (formData: BookingFormData): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(formData)
  })

  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error("Error fetching payment intent")
  }

  return responseBody
}

export const myBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials:"include"
  })
  const responseBody = await response.json()
  if (!response.ok) {
    throw new Error("Error fetching my bookings")
  }

  return responseBody
}