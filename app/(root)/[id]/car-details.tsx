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
import { useEffect, useState } from "react";
import { useLocationStore } from "@/store";
import { addonIcons, featureIcons } from "@/constants/data";

const CarDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { userAddons, setUserAddons } = useLocationStore();

  const [addons, setAddons] = useState([]);
  const [addonsAmount, setAddonsAmount] = useState(0);

  const {
    data: response,
    loading: carLoading,
    error: carError,
  } = useFetch<Car>(`/(api)/car/${id}`, {
    method: "GET",
  });

  const car = response?.data;

  const handleAddonPress = (addonLabel: string) => {
    setAddons((prev) => {
      const updatedAddons = prev.includes(addonLabel)
        ? prev.filter((label) => label !== addonLabel)
        : [...prev, addonLabel];

      setUserAddons(updatedAddons);
      return updatedAddons;
    });

    // Calculate the total amount based on the selected addons
  };

  useEffect(() => {
    if (userAddons?.length > 0 && car?.addons.length > 0) {
      setAddonsAmount(() => {
        const totalAmount = car.addons.reduce((total, addon) => {
          if (userAddons.includes(addon.addonName)) {
            return total + parseFloat(addon.addonValue); // Add the addon amount to the total if matched
          }
          return total; // Return the previous total if no match
        }, 0); // Start from a total of 0

        return totalAmount;
      });
    }
  }, [userAddons]);

  if (carLoading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  if (carError) {
    return <Text className="text-center mt-4">Error loading car details.</Text>;
  }

  return (
    <View className="h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View
          className="relative w-full flex justify-center items-center"
          style={{ height: windowHeight / 4 }}
        >
          <Image
            source={{
              uri: car?.image,
            }}
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

        <View className="flex justify-center items-center mt-7 w-full max-w-lg p-2">
          <Text className="text-2xl text-secondary-100 font-rubik-extrabold">
            Ksh. {car?.price}/day
          </Text>

          <Text className="text-xl text-secondary-600 font-rubik-semibold">
            Ksh. {(car?.price / 1440).toFixed(2)}/minute
          </Text>
        </View>

        <View className="px-5 mt-7 flex gap-2 h-full">
          <View className="items-center px-4 py-2 bg-gray-100 rounded-full inline">
            <Text className="text-sm font-rubik-bold text-secondary-100">
              {car?.brand.brandName}
            </Text>
          </View>

          <Text className="text-2xl font-rubik-extrabold">{car?.name}</Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center gap-2">
              <Text className="text-black-200 mt-1 font-rubik-medium">
                ({car?.category.name})
              </Text>
            </View>
          </View>

          <View className="flex flex-row flex-wrap items-center mt-2 border-y border-gray-300 py-4">
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
              Select addons
            </Text>

            <View className="flex-row mt-4">
              {car?.addons?.map((addon, index) => {
                const icon = addonIcons[addon.addonName] || "❓";

                return (
                  <TouchableOpacity
                    onPress={() => handleAddonPress(addon.addonName)}
                    key={index}
                    className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                  >
                    <Text className="text-xs text-secondary-600 font-rubik-medium">
                      +{addon.addonValue}
                    </Text>
                    <View
                      className={`size-14 rounded-full flex items-center justify-center ${
                        addons?.includes(addon.addonName)
                          ? "border bg-primary-100"
                          : "bg-primary-100/50"
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
            {addons.length > 0 && (
              <Text className="text-secondary-100 text-sm text-center font-rubik mt-2">
                Addons amount: +{addonsAmount}/=
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <TouchableOpacity
            onPress={() => router.replace(`/${id}/add-directions`)}
            className="flex-1 flex flex-row items-center justify-center bg-secondary-100 py-3 rounded-full shadow-md shadow-zinc-400"
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
