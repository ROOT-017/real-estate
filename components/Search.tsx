import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ search: text }),
    500
  );
  const params = useLocalSearchParams();
  const path = usePathname();
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View className="flex flex-row justify-between items-center w-full rounded-lg bg-accent-100 border border-primary-200 mt-5 py-2 px-4 ">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik flex-1  text-black-300 ml-2"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
