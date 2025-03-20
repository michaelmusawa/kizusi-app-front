import { create } from "zustand";
import { LocationStore } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  departureLatitude: null,
  departureLongitude: null,
  departureAddress: null,
  bookType: null,
  date: null,
  endDate: null,
  userAddons: [],
  rideDetails: { time: null, price: null },

  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    });
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    });
  },

  setDepartureLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set({
      departureLatitude: latitude,
      departureLongitude: longitude,
      departureAddress: address,
    });
  },

  setDate: ({ date }: { date: string }) => {
    set({ date });
  },

  setEndDate: ({ endDate }: { endDate: string }) => {
    set({ endDate });
  },

  setBookType: ({ bookType }: { bookType: string }) => {
    set({ bookType });
  },

  setUserAddons: (userAddons: string[]) => {
    set({ userAddons });
  },

  setRideDetails: ({ time, price }: { time: number; price: number }) => {
    set((state) => ({ rideDetails: { time, price } }));
  },
}));
