import { Card, FeatureCards } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { GetGreetings } from "@/utils/index.utils";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeHeader = () => {
  const { user } = useGlobalContext();
  const { greetings } = GetGreetings();

  return (
    <View className="flex flex-row items-center justify-between mt-5">
      <View className="flex-row items-center">
        <Image
          className="size-12 rounded-full "
          source={{ uri: user?.avatar }}
        />
        <View className="flex flex-col items-start justify-center ml-2">
          <Text className="text-xs font-base font-rubik-medium text-black-100">
            {greetings},
          </Text>

          <Text className="text-base font-rubik text-black-300">
            {user?.name.split(" ")[0]}
          </Text>
        </View>
      </View>
      <Image source={icons.bell} className="size-6" />
    </View>
  );
};
export default function Index() {
  // const { user } = useGlobalContext();
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <HomeHeader />
        <Search />
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Feature
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FeatureCards />
          <Card />
        </View>
      </View>
    </SafeAreaView>
  );
}
