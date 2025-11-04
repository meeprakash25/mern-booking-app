import { FiCommand } from "react-icons/fi"

const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">No data found</h2>
      <p className="text-gray-500">There are no hotels matching your search criteria.</p>
    </div>
  )
}

const LoadingHotels = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center gap-2 font-bold text-2xl">
        <span className="">Loading</span>
        <FiCommand className="animate-spin font-small" />
      </div>
      <p className="text-gray-500">Please wait while we load hotels</p>
    </div>
  )
}

const Error = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Error Loading Data</h2>
      <p className="text-gray-500">{message}</p>
    </div>
  )
}

export { NoDataFound, LoadingHotels, Error }