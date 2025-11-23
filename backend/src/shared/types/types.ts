export type UserType = {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export type HotelType = {
  _id: string
  userId: string
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childCount: number
  facilities: string[]
  pricePerNight: number
  starRating: number
  imageUrls: string[]
  lastUpdated: Date
  bookings: BookingType[]
}

export type BookingType = {
  _id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  adultCount: number
  childCount: number
  checkIn: Date
  checkOut: Date
  totalCost: number
}

export type PaymentIntentType = {
  paymentIntentId: string
  clientSecret: string
  totalCost: number
}

export type HotelSearchType = {
  hotels: HotelType[]
  pagination: {
    total: number
    page: number
    pages: number
  }
} 

export type HotelSearchResponseType = {
  message: string
  data: HotelSearchType
}

export type PaymentIntentResponseType = {
  message: string
  data: PaymentIntentType
}

export type UserResponseType = {
  message: string
  data: UserType
}
