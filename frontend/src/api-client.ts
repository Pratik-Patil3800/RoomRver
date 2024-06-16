import axios from 'axios';
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await axios.get(`${API_BASE_URL}/api/users/me`, { withCredentials: true });
  return response.data;
};

export const register = async (formData: RegisterFormData) => {
  const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.status.toString().startsWith("2")) {
    throw new Error(response.data.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.status.toString().startsWith("2")) {
    throw new Error(response.data.message);
  }
  return response.data;
};

export const validateToken = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/auth/validate-token`, {
    withCredentials: true
  });
  return response.data;
};

export const signOut = async () => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/logout`, null, {
    withCredentials: true
  });
  if (!response.status.toString().startsWith("2")) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/api/my-hotels`, hotelFormData, {
    withCredentials: true
  });
  return response.data;
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/my-hotels`, {
    withCredentials: true
  });
  return response.data;
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await axios.get(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    withCredentials: true
  });
  return response.data;
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await axios.put(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, hotelFormData, {
    withCredentials: true
  });
  return response.data;
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility));
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await axios.get(`${API_BASE_URL}/api/hotels/search?${queryParams}`, {
    withCredentials: true
  });
  return response.data;
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/hotels`);
  return response.data;
};

export const HotelNearMe = async (): Promise<HotelType[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/hotels/nearme`);
  return response.data;
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await axios.get(`${API_BASE_URL}/api/hotels/${hotelId}`);
  return response.data;
};

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
  const response = await axios.post(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, 
    { numberOfNights }, 
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data;
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await axios.post(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.status.toString().startsWith("2")) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await axios.get(`${API_BASE_URL}/api/my-bookings`, {
    withCredentials: true
  });
  return response.data;
};
