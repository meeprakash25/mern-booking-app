import type {
  HotelType,
  PaymentIntentType,
  UserType,
  HotelSearchResponseType,
} from "../../../backend/src/shared/types/types"

export interface ApiResponse {
  message: string
  data: Object
}

export interface HotelSearchApiResponse extends ApiResponse {
  data: HotelSearchResponseType['data']
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

export interface PaymentIntentApiResponse extends ApiResponse {
  data: PaymentIntentType
}