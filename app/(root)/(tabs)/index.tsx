import { Card, FeatureCards } from "@/components/Cards";
import Filters from "@/components/Filters";
import HeaderBar from "@/components/HeaderBar";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { GetGreetings } from "@/utils/index.utils";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// const HomeHeader = () => {
//   const { user } = useGlobalContext();
//   const { greetings } = GetGreetings();

//   return (
//     <View className="flex flex-row items-center justify-between mt-5">
//       <View className="flex-row items-center">
//         <TouchableOpacity onPress={() => router.push("/profile")}>
//           <Image
//             className="size-12 rounded-full "
//             source={{ uri: user?.avatar }}
//           />
//         </TouchableOpacity>
//         <View className="flex flex-col items-start justify-center ml-2">
//           <Text className="text-xs font-base font-rubik-medium text-black-100">
//             {greetings},
//           </Text>

//           <Text className="text-base font-rubik text-black-300">
//             {user?.name.split(" ")[0]}
//           </Text>
//         </View>
//       </View>
//       <TouchableOpacity onPress={() => router.push("/notifications")}>
//         <Image source={icons.bell} className="size-6" />
//       </TouchableOpacity>
//     </View>
//   );
// };
export default function Index() {
  const params = useLocalSearchParams<{
    filter?: string;
    query?: string;
  }>();


  const { user } = useGlobalContext();
  const { greetings } = GetGreetings();


  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
      params,
    });
  const {
    refetch,
    data: properties,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: { ...params, limit: 6 },
    skip: true,
  });

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  useEffect(() => {
    refetch({ filter: params.filter, query: params.query, limit: 8 });
    //eslint-disable-next-line
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
        numColumns={2}
        columnWrapperClassName="flex gap-5 px-5"
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          loading ? <ActivityIndicator size={"large"} /> : <NoResults />
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <HeaderBar
              leftChild={
                <View className="flex-row items-center">
                  <TouchableOpacity onPress={() => router.push("/profile")}>
                    <Image
                      className="size-12 rounded-full "
                      source={{ uri: user?.avatar }}
                    />
                  </TouchableOpacity>
                  <View className="flex flex-col items-start justify-center ml-2">
                    <Text className="text-xs font-base font-rubik-medium text-black-100">
                      {greetings},
                    </Text>
                    <Text className="text-base font-rubik text-black-300">
                      {user?.name.split(" ")[0]}
                    </Text>
                  </View>
                </View>
              }
              containerClass="px-0"
              back={false}
            />
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(root)/properties/properties?filter=Featured")
                  }
                >
                  <Text className="text-base font-rubik-medium text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                  keyExtractor={(item) => item.$id}
                  renderItem={({ item }) => (
                    <FeatureCards
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  bounces={false}
                />
              )}
            </View>
            <View className="my-5">
              <View className="flex flex-row items-center justify-between mb-4">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      "/(root)/properties/properties?filter=Recommendation"
                    )
                  }
                >
                  <Text className="text-base font-rubik-medium text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
