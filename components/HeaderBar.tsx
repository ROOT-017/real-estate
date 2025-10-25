import icons from "@/constants/icons";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const HeaderBar = ({
  title,
  bellClass,
  leftChild,
  rightChild,
  tintColor,
  titleClass,
  back = true,
  containerClass,
  defaultBell = true,
  backIconBg = true,
}: {
  title?: string;
  back?: boolean;
  titleClass?: string;
  bellClass?: string;
  tintColor?: string;
  backIconBg?: boolean;
  defaultBell?: boolean;
  leftChild?: ReactNode;
  rightChild?: ReactNode;
  containerClass?: string;
}) => {
  return (
    <View
      className={`flex-row justify-between mt-5 items-center w-full px-4 ${containerClass}`}
    >
      {leftChild}
      {!leftChild && back && (
        <TouchableOpacity
          onPress={() => router.back()}
          className={`flex flex-row  rounded-full size-11 items-center justify-center ${backIconBg ? "bg-primary-100" : ""}`}
        >
          <Image
            className="size-6"
            source={icons.backArrow}
            tintColor={tintColor}
          />
        </TouchableOpacity>
      )}
      {title && (
        <Text className={`text-base font-rubik-bold ${titleClass}`}>
          {title}
        </Text>
      )}
      {!rightChild && defaultBell && (
        <TouchableOpacity onPress={() => router.push("/notifications")}>
          <Image
            className={`size-6 ${bellClass}`}
            tintColor={tintColor}
            source={icons.bell}
          />
        </TouchableOpacity>
      )}
      {rightChild}
    </View>
  );
};

export default HeaderBar;
