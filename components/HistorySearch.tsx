import React, { useState } from "react";
import { View, Image, TextInput } from "react-native";

import { icons } from "@/constants";
import { useLocalSearchParams, router, usePathname } from "expo-router";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  });

  return (
    <View className="bg-white rounded-lg shadow-md p-4 mb-4">
      <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-gray-100 py-2">
        <View className="flex-1 flex flex-row items-center justify-start z-50">
          <Image source={icons.search} className="size-5" />
          <TextInput
            value={search}
            onChangeText={(search) => {
              debouncedSearch(search);
            }}
            placeholder="Search..."
            className="text-sm font-rubik text-black-300 ml-2 flex-1"
          />
        </View>
      </View>
    </View>
  );
};

export default Search;
