import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import Toast from "../components/Toast"
import { useQuery } from "@tanstack/react-query"
import * as apiClient from "../api-client"
import { useNavigate } from "react-router-dom"
import type { ApiResponse } from "../types/ApiResponse"

type ToastMessageType = {
  message: string
  type: "SUCCESS" | "ERROR"
}

type AppContextType = {
  showToast: (toastMessage: ToastMessageType) => void
  isLoggedIn: boolean,
  verifyingToken?: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessageType | undefined>(undefined)
  const navigate = useNavigate()
  const { isError, isPending } = useQuery<ApiResponse>({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
    retry: false,
  })

  useEffect(() => {
    if(isError) {
      navigate("/sign-in")
    }
  }, [isError])

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage)
        },
        isLoggedIn: !isError,
        verifyingToken: isPending
      }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context as AppContextType
}
