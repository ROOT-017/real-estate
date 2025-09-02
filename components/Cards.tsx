import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface FeatureCardProps {
  onPress?: () => void;
}
export const FeatureCards = ({ onPress }: FeatureCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative flex-col items-start w-60 h-80"
    >
      <Image className="size-full rounded-2xl" source={images.japan} />
      <Image
        className="size-full rounded-2xl absolute bottom-0"
        source={images.cardGradient}
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image className="size-3 5" source={icons.star}></Image>
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          4.5
        </Text>
      </View>
      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extra-bold text-white"
          numberOfLines={1}
        >
          Modern Apartment
        </Text>
        <Text className="text-base font-rubik text-white" numberOfLines={1}>
          22 W 15th St, Texas
        </Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl  text-white font-rubik-extra-bold">
            ${2500}
          </Text>
          <Image className="size-5" source={icons.heart}></Image>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const Card = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Text>Card</Text>
    </TouchableOpacity>
  );
};
