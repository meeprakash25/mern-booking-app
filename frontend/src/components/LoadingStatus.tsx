import { FiCommand } from "react-icons/fi"

type Props = {
  message?: string | undefined
}

const NoDataFound = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">No data found</h2>
      <p className="text-gray-500">{message || "There are no hotels matching your search criteria."}</p>
    </div>
  )
}

const LoadingHotels = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center gap-2 font-bold text-2xl">
        <span className="">Loading</span>
        <FiCommand className="animate-spin font-small" />
      </div>
      <p className="text-gray-500">{message || "Please wait while we load hotels"}</p>
    </div>
  )
}

const LoadingData = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center gap-2 font-bold text-2xl">
        <span className="">Loading</span>
        <FiCommand className="animate-spin font-small" />
      </div>
      <p className="text-gray-500">{message || "Please wait for a while"}</p>
    </div>
  )
}

const Error = ({ message }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Error</h2>
      <p className="text-gray-500">{message || "There has been an error loading the data"}</p>
    </div>
  )
}

export { NoDataFound, LoadingHotels, LoadingData, Error }
