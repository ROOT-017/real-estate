import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Properties = () => {
  const { filter } = useLocalSearchParams<{ filter?: string }>();
  return (
    <SafeAreaView className="bg-white h-full">
      <Text>AllProperties</Text>
      <Text>{filter}</Text>
    </SafeAreaView>
  );
};

export default Properties;
