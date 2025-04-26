import { Car } from "@/lib/definitions";
import React from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
} from "react-native";

interface Props {
  recommendations: Car[];
  onSelect: (id: number) => void;
}

export const SimilarVehicles: React.FC<Props> = ({
  recommendations,
  onSelect,
}) => {
  const { width } = Dimensions.get("window");
  const itemWidth = width * 0.4;
  const separatorWidth = width * 0.05;

  const itemAspectRatio = 16 / 9; // widescreen ratio

  const renderVehicle = ({ item }: { item: Car }) => (
    <Pressable
      onPress={() => onSelect(item.id)}
      android_ripple={{ color: "rgba(0,0,0,0.1)" }}
      className="mb-6 rounded-xl overflow-hidden bg-white shadow-lg"
      style={{
        width: itemWidth,
        aspectRatio: itemAspectRatio,
      }}
    >
      <ImageBackground
        source={{ uri: item.image }}
        className="flex-1"
        resizeMode="cover"
      >
        {/* Translucent bottom overlay */}
        <View className="absolute bottom-0 left-0 right-0 px-4 py-3">
          <Text className="text-white text-lg font-bold" numberOfLines={1}>
            {item.name}
          </Text>
          <Text className="text-white text-sm mt-1">
            {`Ksh. ${item.price}/day`}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View>
      <View className="mt-5 bg-gray-50 rounded-2xl shadow-md p-4">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          You Might Also Like
        </Text>

        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id.toString()}
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
    </View>
  );
};
