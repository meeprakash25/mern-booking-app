import { useQuery } from "@tanstack/react-query"
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client"
import { useState } from "react"
import SearchResultsCard from "../components/SearchResultsCard"
import Pagination from "../components/SearchPagination"
import StarRatingFilter from "../components/StarRatingFilter"
import { LoadingHotels, Error, NoDataFound } from "../components/LoadingStatus"
import HotelTypesFilter from "../components/HotelTypesFilter"
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter"
import PriceFilter from "../components/PriceFilter"

const Search = () => {
  const search = useSearchContext()
  const [page, setPage] = useState<number>(1)
  const [selectedStars, setSelectedStars] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
  const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<string[]>([])
  const [maxSelectedPrice, setMaxSelectedPrice] = useState<number | undefined>()
  const [selectedSortOption, setSelectedSortOption] = useState<string>("")

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedHotelFacilities,
    maxPrice: maxSelectedPrice?.toString(),
    sortOption: selectedSortOption,
  }

  const {
    data: result,
    isLoading,
    isRefetching,
    isFetching,
    error,
    isError,
  } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
    refetchOnWindowFocus: false,
    retry: false,
  })

  const hotelData = result?.data

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value
    setSelectedStars((prevStars) =>
      event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating)
    )
    setPage(1)
  }

  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value
    setSelectedHotelTypes((prevTypes) =>
      event.target.checked ? [...prevTypes, hotelType] : prevTypes.filter((type) => type !== hotelType)
    )
    setPage(1)
  }

  const handleHotelFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelFacility = event.target.value
    setSelectedHotelFacilities((prevTypes) =>
      event.target.checked ? [...prevTypes, hotelFacility] : prevTypes.filter((type) => type !== hotelFacility)
    )
    setPage(1)
  }

  const handlePriceChange = (value: number) => {
    const selectedPrice = value
    console.log(selectedPrice)
    setMaxSelectedPrice(selectedPrice)
    setPage(1)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-blue-300 p-5 h-fit lg:sticky top-20">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-blue-300 pb-5">Filter By: </h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
          <HotelFacilitiesFilter
            selectedHotelFacilities={selectedHotelFacilities}
            onChange={handleHotelFacilityChange}
          />
          <PriceFilter
            selectedPrice={maxSelectedPrice}
            onChange={(value?: number) => {
              if (value !== undefined) {
                handlePriceChange(value)
                console.log(value)
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData && `${hotelData?.pagination.total} Hotels found`}
            {hotelData && search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select
            value={selectedSortOption}
            onChange={(event) => setSelectedSortOption(event.target.value)}
            className="p-1 ordered border border-blue-300 rounded">
            <option value="">Sort By</option>
            <option value="starRatingAsc">Star Rating (low to high)</option>
            <option value="starRatingDesc">Star Rating (high to low)</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
          </select>
        </div>
        {
          isLoading ? (
          <LoadingHotels />
        ) : isError ? <Error message={error.message} /> : hotelData?.hotels && hotelData.hotels.length > 0 ? (
          hotelData?.hotels.map((hotel) => <SearchResultsCard key={hotel._id} hotel={hotel} />)
        ) : (
          <NoDataFound />
          ) }
        { (hotelData?.pagination && hotelData.pagination.pages > 1) &&
        <div>
          <Pagination
            page={hotelData.pagination.page || 1}
            pages={hotelData.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
        }
      </div>
    </div>
  )
}

export default Search
