import { createContext, useContext, type ReactNode, useState } from "react"
import Toast from "../components/Toast"
import { useQuery } from "@tanstack/react-query"
import * as apiClient from "../api-client"

type ToastMessageType = {
  message: string
  type: "SUCCESS" | "ERROR"
}

type ValidateTokenType = {
  auth_token: string
}

type AppContextType = {
  showToast: (toastMessage: ToastMessageType) => void
  isLoggedIn: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessageType | undefined>(undefined)

  const { isError } = useQuery<ValidateTokenType>({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
    retry: false
  })

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage)
        },
        isLoggedIn: !isError
      }}>
      { toast && <Toast
        message={ toast.message }
        type={ toast.type }
        onClose={ () => setToast(undefined) } /> }
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context as AppContextType
}
