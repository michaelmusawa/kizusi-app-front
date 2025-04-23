import React from "react";
import {
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "@/constants";
import { Car } from "@/lib/definitions";

type Props = {
  car?: Car;
};

const CarImageSection: React.FC<Props> = ({ car }) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      className="relative w-full flex justify-center items-center"
      style={{ height: windowHeight / 3 }}
    >
      <Image
        source={{ uri: car?.image }}
        className="size-full"
        resizeMode="cover"
      />

      {/* Bottom Gradient Overlay */}
      <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
        }}
      />

      {/* Header: Back Button + Brand */}
      <View
        className="z-50 absolute inset-x-7"
        style={{ top: Platform.OS === "ios" ? 70 : 20 }}
      >
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex bg-primary-200 rounded-full size-11 items-center justify-center"
          >
            <Image source={icons.backArrow} className="size-5" />
          </TouchableOpacity>
          <Text className="text-sm font-rubik-bold text-secondary-100 px-4 py-2 bg-gray-100 rounded-full">
            {car?.brand.brandName}
          </Text>
        </View>
      </View>

      {/* Car Name + Category */}
      <View className="absolute -bottom-6 w-full flex justify-center items-center z-50">
        <Text className="text-2xl font-rubik-extrabold">{car?.name}</Text>
        <Text className="text-black-200 mt-1 font-rubik-medium">
          ({car?.category.categoryName})
        </Text>
      </View>
    </View>
  );
};

export default CarImageSection;
