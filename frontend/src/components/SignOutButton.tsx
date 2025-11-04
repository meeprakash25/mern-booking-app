import * as apiClient from "../api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ApiResponse } from "../types/ApiResponse"
import { useAppContext } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom"
import { FiCommand } from "react-icons/fi"

const SignOutButton = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation<ApiResponse, Error>({
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
    mutate()
  }

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className={`flex items-center text-blue-600 px-3 py-2 font-bold bg-white hover:bg-gray-100 whitespace-nowrap rounded 
        ${isPending ? "disabled" : ""}`}>
      {isPending ? (
        <div className="flex items-center gap-2">
          <span>Signing Out</span>
          <FiCommand className="animate-spin font-small" />
        </div>
      ) : (
        "Sign Out"
      )}
    </button>
  )
}

export default SignOutButton
