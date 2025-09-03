import { propertyTypes } from "@/lib/seed";
import { Models } from "react-native-appwrite";

export interface Property extends Models.Document {
  name: string;
  rating: number;
  address: string;
  image: string;
  facilities: string[];
  type: keyof typeof propertyTypes;
  agent: any;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  getLocation: string;
  reviews: any[];
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
}

export interface Gallery extends Models.Document {
  image: string;
}
