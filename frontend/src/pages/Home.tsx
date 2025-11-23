import { useQuery } from "@tanstack/react-query"
import * as apiClient from "../api-client"
import LatestDestinationCard from "../components/LatestDestinationCard"
import { FiCommand } from "react-icons/fi"
import type { HotelType } from "../../../backend/src/shared/types/types"

const Home = () => {
  const {
    data: hotels,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["fetchHotels"],
    queryFn: apiClient.fetchHotels,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const topRowHotels: HotelType[] = hotels?.data?.slice(0, 2) || []
  const bottomRowHotels: HotelType[] = hotels?.data?.slice(2) || []

  return (
    <div className="space-y-10">
      <div className="grid">
        <h2 className="text-3xl font-bold">Popular Destinations</h2>
        <p className="mb-5">Our most popular destinations</p>
        {isLoading ? (
          <LoadingHotels />
        ) : isError ? (
          <Error message={error.message} />
        ) : hotels?.data && hotels?.data.length > 0 ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {topRowHotels.map((hotel) => (
              <LatestDestinationCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
      <div className="grid">
        <h2 className="text-3xl font-bold">Recent Destinations</h2>
        <p className="mb-5">Our most recent destinations</p>
        {isLoading ? (
          <LoadingHotels />
        ) : isError ? (
          <Error message={error.message} />
        ) : hotels?.data && hotels?.data.length > 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {bottomRowHotels.map((hotel) => (
              <LatestDestinationCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  )
}


type Prop = {
  message?: string | undefined
}

const LoadingHotels = ({ message }: Prop) => {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <div className="flex items-center gap-2 font-bold text-lg">
        <span className="">Loading</span>
        <FiCommand className="animate-spin font-small" />
      </div>
      <p className="text-gray-500">{message || "Please wait for a while"}</p>
    </div>
  )
}

const Error = ({ message }: Prop) => {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <h2 className="text-lg font-bold">Error</h2>
      <p className="text-gray-500">{message || "There has been an error loading the data"}</p>
    </div>
  )
}

const NoDataFound = ({ message }: Prop) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">No data found</h2>
      <p className="text-gray-500">{message || "There are no hotels matching your search criteria."}</p>
    </div>
  )
}

export default Home
