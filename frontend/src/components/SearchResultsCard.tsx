import { AiFillStar } from "react-icons/ai"
import type { HotelType } from "../../../backend/src/shared/types/types"
import { Link } from "react-router-dom"

type Props = {
  hotel: HotelType
}
const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-gray-200 rounded-lg p-4 md:p-8 gap-8 shadow-lg">
      <div className="w-full h-auto">
        <img src={hotel.imageUrls[0]} alt={hotel.name} className="w-full h-auto object-cover object-center rounded" />
      </div>
      <div className="grid grid-rows-[1fr_1/2fr_1fr] md:grid-rows-[1fr_1fr_1fr]">
        <div className="my-1">
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((data, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
            {hotel.name}
          </Link>
        </div>
        <div className="line-clamp-2 md:line-clamp-4">{hotel.description}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-end whitespace-nowrap mt-3 md:mt-0">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-blue-100 p-2 rounded-lg font-bold text-xs whitespace-nowrap" key={facility}>
                {facility}
              </span>
            ))}
            <span className="text-sm">{hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold text-sm my-1">${hotel.pricePerNight} per night</span>
            <Link
              to={`/detail/${hotel._id}`}
              type="button"
              className="bg-blue-700 px-4 py-2 rounded text-white whitespace-nowrap hover:bg-blue-800 active:bg-blue-700 max-w-fit">
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResultsCard
