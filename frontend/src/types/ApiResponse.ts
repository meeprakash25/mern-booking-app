import type { HotelType } from "../../../backend/src/shared/types/HotelType"

export interface ApiResponse {
  message: string
  data: Object
}

export interface HotelListApiResponse extends ApiResponse {
  data: [HotelType]
}
