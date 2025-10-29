import * as apiClient from "../api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ApiResponse } from "../types/ApiResponse"
import { useAppContext } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom"

const SignOutButton = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation<ApiResponse, Error>({
    mutationFn: apiClient.signOut,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
      showToast({ message: data?.message, type: "SUCCESS" })
      navigate("/sign-in")
    },
    onError: (error: Error) => {
      showToast({ message: error?.message, type: "ERROR" })
    },
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 whitespace-nowrap rounded">
      Sign Out
    </button>
  )
}

export default SignOutButton
