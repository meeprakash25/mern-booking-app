import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"
import type { ApiResponse } from "../types/ApiResponse"
import { Link, useNavigate } from "react-router-dom"
import { FiCommand } from "react-icons/fi"

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const { mutate, isPending } = useMutation<ApiResponse, Error, RegisterFormData>({
    mutationFn: apiClient.register,
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
    <div className="flex h-[32rem] items-center justify-center">
      <form
        onSubmit={onSubmit}
        action=""
        className="flex flex-1 flex-col gap-5  mx-0 md:mx-[5rem] lg:mx-[10rem] xl:mx-[15rem] 2xl:mx-[25rem] border border-blue-300 px-5 py-10 rounded shadow-lg">
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
          <label htmlFor="firstName" className="text-gray-700 text-sm font-bold flex-1">
            First Name
            <input
              type="text"
              id="firstName"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
          </label>
          <label htmlFor="lastName" className="text-gray-700 text-sm font-bold flex-1">
            Last Name
            <input
              type="text"
              id="lastName"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
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
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <label htmlFor="password" className="text-gray-700 text-sm font-bold flex-1">
            Password
            <input
              type="password"
              id="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </label>
          <label htmlFor="confirm-password" className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password
            <input
              type="password"
              id="confirm-password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "Confirm Password is required"
                  } else if (watch("password") !== val) {
                    return "Your passwords donot match"
                  }
                },
              })}
            />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
          </label>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">
            Have account?{" "}
            <Link className="hover:underline hover:text-blue-500 text-blue-600" to="/sign-in">
              Signin here
            </Link>
          </span>
          <button
            disabled={isPending}
            type="submit"
            className={`bg-blue-700 px-4 py-2 rounded text-white whitespace-nowrap hover:bg-blue-800 active:bg-blue-700 ${
              isPending ? " disabled" : ""
            }`}>
            {isPending ? (
              <div className="flex items-center gap-2">
                <span>Please wait</span>
                <FiCommand className="animate-spin font-small" />
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
