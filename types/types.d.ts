import { propertyTypes } from "@/constants/data";
import { Models } from "react-native-appwrite";

export type PropertyType = (typeof propertyTypes)[number];

export interface Property extends Models.Document {
  name: string;
  rating: number;
  address: string;
  image: string;
  facilities: string[];
  type: PropertyType;
  agent: Agent;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  getLocation: string;
  reviews: any[];
  area: number;
  gallery: Gallery[];
}

export interface Agent extends Models.Document {
  name: string;
  avatar: string;
  email: string;
}
export interface Review extends Models.Document {
  name: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
}

export interface Gallery extends Models.Document {
  image: string;
}
