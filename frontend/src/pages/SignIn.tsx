import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import type { ApiResponse } from "../types/ApiResponse"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"
import { Link, useNavigate } from "react-router-dom"

export type SignInFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>()
  const navigate = useNavigate()
  const { showToast } = useAppContext()

  const {mutate, isPending} = useMutation<ApiResponse, Error, SignInFormData>({
    mutationFn: apiClient.signIn,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] })
      showToast({ message: data?.message, type: "SUCCESS" })
      navigate("/")
    },
    onError: (error: Error) => {
      console.log(error)
      showToast({ message: error?.message, type: "ERROR" })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data)
  })

  return (
    <form onSubmit={onSubmit} action="" className="flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label htmlFor="email" className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          id="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </label>
      <label htmlFor="password" className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          id="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 1,
              message: "Password is required",
            },
          })}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </label>
      <div className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="hover:underline hover:text-blue-500 text-blue-600" to="/register">
            Create an account here
          </Link>
        </span>
        <button
          disabled={isPending}
          type="submit"
          className={`bg-blue-700 px-4 py-2 rounded text-white whitespace-nowrap hover:bg-blue-800 active:bg-blue-700 ${isPending ? "disabled" : ""}`}>
          {isPending ? "Please wait..." : "Sign In"}
        </button>
      </div>
    </form>
  )
}

export default SignIn
