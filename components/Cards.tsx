import icons from "@/constants/icons";
import images from "@/constants/images";
import { Property } from "@/types/types";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

interface CardProps {
  onPress?: () => void;
  item: Property;
}
export const FeatureCards = ({ onPress, item }: CardProps) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#0061FF0A" }}
      className="relative flex-col items-start w-60 h-80"
    >
      <Image className="size-full rounded-2xl" source={images.japan} />
      <Image
        className="size-full rounded-2xl absolute bottom-0"
        source={{
          uri: item.image ?? "",
        }}
      />
      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image className="size-3.5" source={icons.star}></Image>
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {item.rating}
        </Text>
      </View>
      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extra-bold text-white"
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text className="text-base font-rubik text-white" numberOfLines={1}>
          {item.address}
        </Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl  text-white font-rubik-extra-bold">
            ${item.price.toLocaleString()}
          </Text>
          <Image className="size-5" source={icons.heart}></Image>
        </View>
      </View>
    </Pressable>
  );
};
export const Card = ({ onPress, item }: CardProps) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#0061FF0A" }}
      style={{ elevation: Platform.OS === "android" ? 10 : 0 }}
      className="flex-1 w-ful mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center bg-white/90 px-2 p-1 rounded-full absolute top-5 right-5">
        <Image className="size-2.5" source={icons.star}></Image>
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {item.rating}
        </Text>
      </View>
      <Image
        source={{
          uri: item.image,
        }}
        className="w-full h-40 rounded-lg"
      ></Image>
      <View className="flex flex-col mt-2">
        <Text
          numberOfLines={1}
          className="text-base font-rubik-bold text-black-300"
        >
          {item.name}
        </Text>
        <Text numberOfLines={1} className="text-base font-rubik text-black-200">
          {item.address}
        </Text>
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base  text-primary-300 font-rubik-bold">
            ${item.price.toLocaleString()}
          </Text>
          <Image
            className="w-5 h-5 mr-2"
            tintColor={"#191d31"}
            source={icons.heart}
          ></Image>
        </View>
      </View>
    </Pressable>
  );
};
