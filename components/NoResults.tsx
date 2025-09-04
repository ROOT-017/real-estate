import images from "@/constants/images";
import React from "react";
import { Image, Text, View } from "react-native";

const NoResults = ({
  mainMessage = "No Results",
  imageStyle = "w-11/12 h-80",
  mainTextStyle,
}: {
  mainMessage?: string;
  imageStyle?: string;
  mainTextStyle?: string;
}) => {
  return (
    <View className="flex items-center my-5">
      <Image
        className={imageStyle}
        resizeMode="contain"
        source={images.noResult}
      />
      <Text
        className={`text-2xl font-rubik-bold text-black-300 mt-5 ${mainTextStyle}`}
      >
        {mainMessage}
      </Text>
      <Text className="text-base text-black-100 mt-2">
        We could not find any results
      </Text>
    </View>
  );
};

export default NoResults;
