import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { getFilterTypeTitle } from "@/utils/index.utils";
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

const Explore = () => {
  const params = useLocalSearchParams<{
    filter?: string;
    query?: string;
  }>();

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
    // console.log(params);

    refetch({ filter: params.filter, query: params.query, limit: 20 });
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
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5"></Image>
              </TouchableOpacity>
              <Text className="text-base mr-2 items-center text-black-300 font-rubik-medium">
                Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className="size-5"></Image>
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl mt-5 font-rubik-bold text-black-300">
                Found {properties?.length}{" "}
                {params.filter && params.filter !== "All"
                  ? getFilterTypeTitle(params.filter)
                  : "Properties"}
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
