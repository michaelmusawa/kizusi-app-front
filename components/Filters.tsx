import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity } from "react-native";

const Filters = ({ brands }: { brands: string[] }) => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(params.filter || "");

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
      contentContainerStyle={{ paddingVertical: 4 }}
    >
      <TouchableOpacity
        onPress={() => handleCategoryPress("")}
        className={`px-4 py-2 rounded-full mr-2 mb-2 ${
          selectedCategory === ""
            ? "bg-secondary-100/50"
            : "bg-primary-100 border border-primary-200"
        }`}
        accessibilityRole="button"
      >
        <Text
          className={`font-rubik-regular text-sm ${
            selectedCategory === "" ? "text-gray-50" : "text-black-300"
          }`}
        >
          All
        </Text>
      </TouchableOpacity>
      {brands.map((brand, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(brand)}
          key={index}
          className={`px-4 py-2 rounded-full mr-2 mb-2 ${
            selectedCategory === brand
              ? "bg-secondary-100/50"
              : "bg-primary-100 border border-primary-200"
          }`}
        >
          <Text
            className={`font-rubik-regular text-sm ${
              selectedCategory === brand ? "text-gray-50" : "text-black-300"
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
