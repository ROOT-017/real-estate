import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const handleLogin = () => {};
  return (
    <SafeAreaView className="h-full flex-1 bg-white">
      <ScrollView contentContainerClassName="flex-1 h-full ">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik-medium text-black-200">
            Welcome to Restate
          </Text>
          <Text className="text-2xl text-center uppercase font-rubik-bold text-black-300 mt-3">
            Let&apos;s Get You Closer {"\n"}
            <Text className=" text-primary-300 ">Your Ideal Home</Text>
          </Text>
          <Text className="text-lg text-center mt-12 text-black-200 font-rubik">
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            // style={{ elevation: 10 }}
            onPress={handleLogin}
          >
            <View className=" flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="h-5 w-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
