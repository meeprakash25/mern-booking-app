import { useState, type FormEvent } from "react"
import { useSearchContext } from "../contexts/SearchContext"
import { MdTravelExplore } from "react-icons/md"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const navigate = useNavigate()
  const search = useSearchContext()
  const [destination, setDestination] = useState<string>(search.destination)
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
  const [adultCount, setAdultCount] = useState<number>(search.adultCount)
  const [childCount, setChildCount] = useState<number>(search.childCount)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount)
    navigate("/search")
  }

  const minDate = new Date()
  const oneDayInMilliSeconds = 86400000
  const checkoutMinDate = new Date(Date.now() + oneDayInMilliSeconds)
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)
  
  return (
    <form
      onSubmit={handleSubmit}
      className="search -mt-8 p-3 bg-[#FF8040] rounded shadow-md grid grid-cols-2 lg:grid-cols-6 2xl:grid-cols-7 items-center gap-2">
      <div className="flex flex-row items-center bg-white rounded p-2 col-span-2">
        <MdTravelExplore size="25" className="mr-2" />
        <input
          type="text"
          className="text-md w-full focus:outline-none"
          placeholder="Where are you going?"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <div className="flex items-center bg-white rounded px-2 h-full col-span-2">
        <label className="items-center flex flex-1">
          Adults:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex flex-1">
          Children:
          <input
            type="number"
            className="w-full p-1 focus:outline-none font-bold"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in date"
          className="w-1/2 min-w-full bg-white p-2 rounded focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={checkoutMinDate}
          maxDate={maxDate}
          placeholderText="Check-out date"
          className="w-1/2 min-w-full bg-white p-2 rounded focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1 h-full">
        <button className="w-full bg-blue-800 text-white h-full p-2 font-bold hover:bg-blue-900 rounded">Search</button>
        <button className="bg-red-800 text-white h-full p-2 font-bold hover:bg-red-900 rounded">Clear</button>
      </div>
    </form>
  )
}

export default SearchBar
