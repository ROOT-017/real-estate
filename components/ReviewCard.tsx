import icons from "@/constants/icons";
import { Review } from "@/types/types";
import React from "react";
import { Image, Platform, Text, View } from "react-native";

const ReviewCard = ({
  name,
  avatar,
  rating,
  review,
  $createdAt: date,
}: Review) => {
  return (
    <View
      className="w-[388px]rounded-xl bg-white shadow-lg p-4 shadow-black-100/90"
      style={{ elevation: Platform.OS === "android" ? 10 : 0 }}
    >
      <View className="flex flex-row items-center gap-2">
        <Image source={{ uri: avatar }} className="size-12 rounded-full" />
        <Text className="text-base font-rubik-bold text-black-300">{name}</Text>
      </View>
      <Text className="text-base font-rubik-medium text-black-200 my-4">
        {review}
      </Text>
      <View className="flex-row justify-between items-center">
        <View className="flex w-fit flex-row items-center gap-2">
          <Image source={icons.heart} className="size-5" tintColor={"blue"} />
          <Text className="text-base font-rubik-bold text-black-300">
            {rating}
          </Text>
        </View>
        <Text className="text-base font-rubik-medium text-black-200">
          {new Date(date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
