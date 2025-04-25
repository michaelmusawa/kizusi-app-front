import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";

interface Vehicle {
  id: string;
  name: string;
  image: string;
  price: number;
}
interface Props {
  recommendations: Vehicle[];
  onSelect: (id: string) => void;
}

export const SimilarVehicles: React.FC<Props> = ({
  recommendations,
  onSelect,
}) => {
  const { width } = Dimensions.get("window");
  const itemWidth = width * 0.4;
  const separatorWidth = width * 0.05;

  const renderVehicle = ({ item }: ListRenderItemInfo<Vehicle>) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(item.id)}
      className="bg-white rounded-xl shadow-lg overflow-hidden border"
      style={{ width: itemWidth }}
    >
      <Image
        source={{ uri: item.image }}
        className="w-full"
        style={{ height: 70 }}
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-base font-bold text-gray-900">{item.name}</Text>
        <Text className="mt-1 text-blue-500 font-semibold">{`Ksh. ${item.price}/day`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="mt-8">
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        You Might Also Like
      </Text>

      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + separatorWidth}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: separatorWidth / 2,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: separatorWidth }} />
        )}
        renderItem={renderVehicle}
      />
    </View>
  );
};
