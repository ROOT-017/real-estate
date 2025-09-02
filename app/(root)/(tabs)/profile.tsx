import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const SettingsItem = ({
  text,
  icon,
  onPress,
  showArrow = true,
  textStyle,
}: {
  text: string;
  icon: ImageSourcePropType;
  textStyle?: string;
  onPress?: () => void;
  showArrow?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-3"
    >
      <View className="flex-row items-center gap-3">
        <Image className="size-6" source={icon} />
        <Text
          className={`text-lg font-rubik- bold text-black-300 ${textStyle}`}
        >
          {text}
        </Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-6" />}
    </TouchableOpacity>
  );
};
const Profile = () => {
  const { user, refetch } = useGlobalContext();
  console.log(user?.avatar);
  
  const handleLogout = async () => {
    const results = await logout();

    if (results) {
      Alert.alert("You have been successfully logout");
      refetch({});
    } else {
      Alert.alert("An error occurred while logging out. Try again");
    }
    // refetch({});
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex-row justify-between mt-5 items-center">
          <Text className="text-xl font-rubik-bold ">Profile</Text>
          <Image className="size-5" source={icons.bell} />
        </View>
        <View className="flex-row mt-5 justify-center">
          <View className="flex-col items-center relative mt-5">
            <Image
              className="size-44 relative rounded-full"
              source={user?.avatar ? { uri: user?.avatar } : images.avatar}
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image className="size-9" source={icons.edit}></Image>
            </TouchableOpacity>
            <Text className="text-2xl">{user?.name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} text="My Bookings" />
          <SettingsItem icon={icons.wallet} text="Payments" />
        </View>
        <View className="flex flex-col mt-10 border-t pt-5 border-primary-200">
          {settings.slice(3).map((item, index) => (
            <SettingsItem
              key={index}
              icon={item.icon}
              text={item.title}
              // onPress={item.onPress}
            />
          ))}
        </View>
        <View className="flex flex-col mt-10  border-primary-200">
          <SettingsItem
            icon={icons.logout}
            text="Logout"
            textStyle="!text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
