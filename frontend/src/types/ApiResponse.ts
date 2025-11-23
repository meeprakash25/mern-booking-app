import type { HotelType, UserType } from "../../../backend/src/shared/types/types"

export interface ApiResponse {
  message: string
  data: Object
}

export interface HotelListApiResponse extends ApiResponse {
  data: HotelType[]
}

export interface HotelByIdApiResponse extends ApiResponse {
  data: HotelType
}

export interface MyBookingsApiResponse extends ApiResponse {
  data: HotelType[]
}

export interface UserTypeApiResponse extends ApiResponse {
  data: UserType
}