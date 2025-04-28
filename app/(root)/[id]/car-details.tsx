import React, { useRef } from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useFetch } from "@/lib/fetch";
import { Car } from "@/lib/definitions";
import { CarDetailsHeader } from "@/components/car-details/CarDetailsHeader";
import { CarDetailsFeatures } from "@/components/car-details/CarDetailsFeatures";
import { CarDetailsOverview } from "@/components/car-details/CarDetailsOverview";
import { CarDetailsAddons } from "@/components/car-details/CarDetailsAddons";
import { CarDetailsFooter } from "@/components/car-details/CarDetailsFooter";
import { SimilarVehicles } from "@/components/car-details/SimilarVehicles";
import { useCars } from "@/hook/useCars";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const CarDetails: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const windowHeight = Dimensions.get("window").height;
  const headerHeight = windowHeight / 2;

  const scrollY = useRef(new Animated.Value(0)).current;

  // Header animations
  const animateHeight = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: "clamp",
  });
  const animateOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  // Card animations
  const cardTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight * 0.85],
    extrapolate: "clamp",
  });
  const cardOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight * 0.4, headerHeight * 0.8],
    outputRange: [1, 0.7, 0],
    extrapolate: "clamp",
  });

  const { cars, loading: carsLoading, error: carsError } = useCars("", "");

  const { data, loading, error } = useFetch<{ data: Car }>(`/(api)/car/${id}`, {
    method: "GET",
  });
  const car = data?.data;
  if (loading && carsLoading)
    return <Text className="text-center mt-4">Loading...</Text>;
  if ((error && carsError) || !car)
    return <Text className="text-center mt-4">Error loading car details.</Text>;

  return (
    <GestureHandlerRootView>
      <View className="flex-1">
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            // eslint-disable-next-line prettier/prettier
            { useNativeDriver: false }
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Animated Header */}
          <Animated.View
            style={{
              height: animateHeight,
              opacity: animateOpacity,
              overflow: "hidden",
            }}
          >
            <CarDetailsHeader car={car} />
          </Animated.View>

          {/* Tailwind-styled Hanging Card */}
          <Animated.View
            style={{
              position: "absolute",
              top: headerHeight - 50,
              left: 20,
              right: 20,
              zIndex: 10,
              transform: [{ translateY: cardTranslateY }],
              opacity: cardOpacity,
            }}
          >
            <View className="bg-gray-100/70 blur-lg p-4 rounded-2xl shadow-lg items-center w-2/3 m-auto">
              <Text className="text-2xl font-extrabold text-gray-900 text-center">
                {car.name}
              </Text>
              <Text className="text-sm text-gray-500 mt-1 text-center">
                {car.category.categoryName}
              </Text>
              <Text className="text-xl font-bold text-secondary-100 mt-2 text-center">
                {`Ksh. ${car.price}/day`}
              </Text>
            </View>
          </Animated.View>

          {/* Main Content */}
          <View className="px-5 mt-20">
            <CarDetailsFeatures car={car} />
            <CarDetailsOverview car={car} />
            <CarDetailsAddons car={car} />
            <SimilarVehicles
              recommendations={cars}
              onSelect={(id) => {
                router.replace(`/${id}/car-details`);
              }}
            />
          </View>
        </Animated.ScrollView>

        <CarDetailsFooter id={id!} />
      </View>
    </GestureHandlerRootView>
  );
};

export default CarDetails;
