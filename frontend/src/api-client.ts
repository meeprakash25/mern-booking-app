import type { RegisterFormData } from "./pages/Register"
import type { ApiResponse } from "./types/ApiResponse"
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
  if (!response.ok) {
    throw new Error("Token invalid")
  }
  return await response.json()
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

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const signOut = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error("Error during logout")
  }

  return body
}
