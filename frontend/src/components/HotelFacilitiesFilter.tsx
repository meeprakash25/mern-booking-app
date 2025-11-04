import { hotelFacilities } from "../config/hotel-options-configs"

type Props = {
  selectedHotelFacilities: string[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

const HotelFacilitiesFilter = ({selectedHotelFacilities, onChange}: Props) => {
  return (
    <div className="border-b border-blue-300 pb-5">
      <h4 className="text-md font-semibold mb-2">
        Hotel Type
      </h4>
      { hotelFacilities.map((facility, index) => (
        <label key={`facility${index}`} htmlFor={`facility${index}`} className="flex items-center space-x-2">
          <input type="checkbox" id={`facility${index}`} className="rounded" value={ facility } checked={ selectedHotelFacilities.includes(facility) } onChange={ onChange } />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  )
}

export default HotelFacilitiesFilter