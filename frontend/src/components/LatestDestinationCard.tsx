import React from 'react'
import type { HotelType } from '../../../backend/src/shared/types/types'
import { Link } from 'react-router-dom'

type Props = {
  hotel: HotelType
}

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link to={ `/detail/${hotel._id}` } className="relative cursor-pointer overflow-hidden rounded-md">
      <div className="h-[300px]">
        <img src={hotel.imageUrls[0]} alt={hotel.name} className="w-full h-full object-cover object-center" />
      </div>
      <div className="absolute bottom-0 p-4 bg-black opacity-70 w-full rounded-b-rounded">
        <div className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </div>
      </div>
    </Link>
  )
}

export default LatestDestinationCard