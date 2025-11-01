import type { RegisterFormData } from "./pages/Register"
import type { ApiResponse, HotelListApiResponse } from "./types/ApiResponse"
import type { SignInFormData } from "./pages/SignIn"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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
