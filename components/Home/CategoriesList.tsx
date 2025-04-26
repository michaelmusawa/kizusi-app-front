import { FlatList, ActivityIndicator, View, Text } from "react-native";
import { CategoryCard } from "@/components/CarCard";
import NoResults from "@/components/NoResults";
import { Category } from "@/lib/definitions";

interface CategoriesListProps {
  categories: Category[];
  loading: boolean;
  error?: string | null;
  onPress: (categoryName: string) => void;
}

export const CategoriesList = ({
  categories,
  loading,
  error,
  onPress,
}: CategoriesListProps) => (
  <View>
    <View className="mt-5 mx-4 p-4 bg-gray-50 rounded-lg shadow-md">
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
  </View>
);
