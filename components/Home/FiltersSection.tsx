// import { View, Text, TouchableOpacity } from "react-native";
// import Filters from "../Filters";

// interface FiltersSectionProps {
//   brands: string[]; // Adjust the type based on the actual data structure
//   seeAll: boolean;
//   onToggle: () => void;
// }

// export const FiltersSection: React.FC<FiltersSectionProps> = ({
//   brands,
//   seeAll,
//   onToggle,
// }) => (
//   <View className="mt-5 px-5">
//     <View className="flex-row justify-between items-center">
//       <Text className="text-xl font-rubik-bold">Available cars</Text>
//       <TouchableOpacity onPress={onToggle}>
//         <Text className="text-base font-rubik-bold text-secondary-100">
//           {seeAll ? "See all" : "See less"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//     <Filters brands={brands} />
//   </View>
// );

import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Filters from "../Filters";

interface FiltersSectionProps {
  brands: string[];
  seeAll: boolean;
  onToggle: () => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  brands,
  seeAll,
  onToggle,
}) => {
  // Determine how many chips to show when collapsed

  return (
    <View>
      <View className="mt-5 mx-4 p-4 bg-gray-50 rounded-lg shadow-md">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-rubik-bold">Available cars</Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={onToggle}
            accessibilityRole="button"
            accessibilityLabel={seeAll ? "See less filters" : "See all filters"}
          >
            <Text className="text-base font-rubik-bold text-secondary-100 mr-1">
              {!seeAll ? "See less" : "See all"}
            </Text>
            <Text className="text-secondary-100">{!seeAll ? "▲" : "▼"}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 1 }}
        >
          <Filters brands={brands} />
        </ScrollView>
      </View>
    </View>
  );
};
