import { View, Text, TouchableOpacity } from "react-native";
import Filters from "../Filters";

export const FiltersSection = ({ brands, seeAll, onToggle }) => (
  <View className="mt-5 px-5">
    <View className="flex-row justify-between items-center">
      <Text className="text-xl font-rubik-bold">Available cars</Text>
      <TouchableOpacity onPress={onToggle}>
        <Text className="text-base font-rubik-bold text-secondary-100">
          {seeAll ? "See all" : "See less"}
        </Text>
      </TouchableOpacity>
    </View>
    <Filters brands={brands} />
  </View>
);
