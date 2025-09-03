import { Card } from "@/components/Cards";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Explore = () => {
  const params = useLocalSearchParams<{
    filters?: string;
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
    refetch({ filters: params.filters, query: params.query, limit: 8 });
    //eslint-disable-next-line
  }, [params.filters, params.query]);

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
            <Search />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
