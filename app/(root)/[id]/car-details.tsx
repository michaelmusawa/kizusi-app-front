import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { carImages, icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { Car } from "@/lib/definitions";
import { useState } from "react";
import { useLocationStore } from "@/store";
import { addonIcons, featureIcons } from "@/constants/data";

const CarDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { setUserAddons } = useLocationStore();

  const [addons, setAddons] = useState([]);

  const {
    data: response,
    loading: carLoading,
    error: carError,
  } = useFetch<Car>(`/(api)/car/${id}`, {
    method: "GET",
  });

  const car = response?.data;

  if (carLoading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  if (carError) {
    return <Text className="text-center mt-4">Error loading car details.</Text>;
  }

  const handleAddonPress = (addonLabel: string) => {
    setAddons((prev) => {
      const updatedAddons = prev.includes(addonLabel)
        ? prev.filter((label) => label !== addonLabel)
        : [...prev, addonLabel];

      // Update Zustand store with the latest addons
      setUserAddons(updatedAddons);
      return updatedAddons;
    });
  };

  return (
    <View className="h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View
          className="relative w-full flex justify-center items-center"
          style={{ height: windowHeight / 3 }}
        >
          <Image
            source={carImages.audiCar}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.favorite}
                  className="size-7"
                  tintColor={"#191D31"}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2 h-full">
          <Text className="text-2xl font-rubik-extrabold">{car?.name}</Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-gray-100 rounded-full">
              <Text className="text-sm font-rubik-bold text-primary-300">
                {car?.brand.brandName}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                ({car?.category.name})
              </Text>
            </View>
          </View>

          <View className="flex flex-row flex-wrap items-center mt-5">
            {car?.features?.map((feature, index) => {
              const icon =
                featureIcons[feature.featureName.toLowerCase()] || icons.star; // Fallback to a default icon

              return (
                <View
                  key={index}
                  className="flex flex-row items-center mr-4 mb-2"
                >
                  <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                    <Image source={icon} className="size-4" />
                  </View>
                  <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                    {feature.featureValue} {feature.featureName}
                  </Text>
                </View>
              );
            })}
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Overview
            </Text>
            <Text className="text-black-200 text-base font-rubik mt-2">
              {car?.description}
            </Text>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Addons
            </Text>

            <View className="flex-row justify-between mt-4">
              {car?.addons?.map((addon, index) => {
                const icon = addonIcons[addon.addonName] || "❓";

                return (
                  <TouchableOpacity
                    onPress={() => handleAddonPress(addon.addonName)}
                    key={index}
                    className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                  >
                    <View
                      className={`size-14 bg-primary-100 rounded-full flex items-center justify-center ${
                        addons?.includes(addon.addonName) ? "border" : ""
                      }`}
                    >
                      <Text className="text-lg">{icon}</Text>
                    </View>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="text-black-300 text-sm text-center font-rubik mt-1.5"
                    >
                      {addon.addonName}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${car?.price}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.replace(`/${id}/add-directions`)}
            className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400"
          >
            <Text className="text-white text-lg text-center font-rubik-bold">
              Proceed to book
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CarDetails;
