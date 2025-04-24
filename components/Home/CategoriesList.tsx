import { FlatList, ActivityIndicator, View, Text } from "react-native";
import { CategoryCard } from "@/components/CarCard";
import NoResults from "@/components/NoResults";

export const CategoriesList = ({ categories, loading, error, onPress }) => (
  <View className="m-5">
    <Text className="text-xl font-rubik-bold">Categories</Text>
    {loading ? (
      <ActivityIndicator size="large" />
    ) : categories.length === 0 ? (
      <NoResults />
    ) : (
      <FlatList
        data={categories}
        horizontal
        renderItem={({ item }) => (
          <CategoryCard category={item} onPress={() => onPress(item.name)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerClassName="flex gap-5 mt-5"
      />
    )}
  </View>
);
