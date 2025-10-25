import HeaderBar from "@/components/HeaderBar";
import React from "react";
import { FlatList, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationCard = () => {
  return (
    <View
      className="flex rounded-xl mt-5 bg-white shadow-black-200 p-3"
      style={{ elevation: Platform.OS === "android" ? 3 : 0 }}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-rubik-bold text-black-300">Notice</Text>
        <Text className="text-xl font-rubik text-black-100">
          {new Date().toLocaleDateString()}
        </Text>
      </View>
      <Text className="text-lg font-rubik text-black-200">
        You have successfully booked Apartment 4 at St Peter Blvd 7845
      </Text>
    </View>
  );
};
const Notification = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={Array.from({ length: 10 })}
        renderItem={() => <NotificationCard />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerClassName=" px-4 pb-32"
        ListHeaderComponent={
          <HeaderBar
            title="Notifications"
            defaultBell={false}
            rightChild={<View />}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Notification;
