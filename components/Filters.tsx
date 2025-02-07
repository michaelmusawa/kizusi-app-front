import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity } from "react-native";

const Filters = ({ brands }: { brands: string[] }) => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      <TouchableOpacity
        onPress={() => handleCategoryPress("")}
        className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
          selectedCategory === ""
            ? "bg-primary-300"
            : "bg-primary-100 border border-primary-200"
        }`}
      >
        <Text
          className={`text-sm ${
            selectedCategory === ""
              ? "text-white font-rubik-bold mt-0.5"
              : "text-black-300 font-rubik"
          }`}
        >
          All
        </Text>
      </TouchableOpacity>
      {brands.map((brand, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(brand)}
          key={index}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
            selectedCategory === brand
              ? "bg-primary-300"
              : "bg-primary-100 border border-primary-200"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedCategory === brand
                ? "text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}
          >
            {brand}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
