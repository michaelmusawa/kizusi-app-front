import { icons, images } from "@/constants";
import { Car, Category } from "@/lib/definitions";
import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

export const Card = ({ car, onPress }: { car: Car; onPress?: () => void }) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
      onPress={onPress}
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {car.brand.brandName}
        </Text>
      </View>

      <Image
        source={{
          uri: car.image,
        }}
        className="w-full h-32 rounded-lg"
      />

      <View className="mt-2">
        <Text className="text-xs font-rubik-bold text-gray-500 text-black-100 border border-gray-300 rounded-lg p-1 w-fit">
          {car.category.categoryName}
        </Text>

        <Text className="text-base font-rubik-bold text-black-300">
          {car.name || "Unknown Car"}
        </Text>
        <Text
          className="text-xs font-rubik-bold text-gray-500"
          numberOfLines={1}
        >
          {car.description}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-secondary-100">
            Ksh.{car.price || "0"}
          </Text>
          <Image
            source={icons.favorite}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CategoryCard = ({
  category,
  onPress,
}: {
  category: Category;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image
        source={{
          uri: category.image,
        }}
        className="size-full rounded-2xl"
      />

      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">5</Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          {category.name}
        </Text>
        <Text className="text-base font-rubik text-white" numberOfLines={1}>
          Brands:{" "}
          {category?.brands?.length > 0
            ? category.brands.map((b) => (
                <Text key={b.brandId}> {b.brandName} </Text>
              ))
            : "No brands available"}
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            Ksh.{category.price}
          </Text>
          <Image source={icons.favorite} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
