// import {
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
//   Dimensions,
//   Platform,
// } from "react-native";
// import { router, useLocalSearchParams } from "expo-router";
// import { icons } from "@/constants";
// import { useFetch } from "@/lib/fetch";
// import { Car } from "@/lib/definitions";
// import { addonIcons, featureIcons } from "@/constants/data";
// import { LinearGradient } from "expo-linear-gradient";

// const CarDetails = () => {
//   const { id } = useLocalSearchParams<{ id?: string }>();

//   const windowHeight = Dimensions.get("window").height;

//   const {
//     data: response,
//     loading: carLoading,
//     error: carError,
//   } = useFetch<{ data: Car }>(`/(api)/car/${id}`, {
//     method: "GET",
//   });

//   const car = response?.data || null;

//   if (carLoading) {
//     return <Text className="text-center mt-4">Loading...</Text>;
//   }

//   if (carError) {
//     return <Text className="text-center mt-4">Error loading car details.</Text>;
//   }

//   return (
//     <View className="h-full">
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerClassName="pb-32 bg-white"
//       >
//         <View
//           className="relative w-full flex justify-center items-center"
//           style={{ height: windowHeight / 2 }}
//         >
//           <Image
//             source={{ uri: car?.image }}
//             className="size-full"
//             resizeMode="cover"
//           />

//           {/* Bottom Linear Gradient overlay */}
//           <LinearGradient
//             colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               height: 80,
//             }}
//           />

//           <View
//             className="z-50 absolute inset-x-7"
//             style={{ top: Platform.OS === "ios" ? 70 : 20 }}
//           >
//             <View className="flex flex-row items-center w-full justify-between">
//               <TouchableOpacity
//                 onPress={() => router.back()}
//                 className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
//               >
//                 <Image source={icons.backArrow} className="size-5" />
//               </TouchableOpacity>
//               <View className="flex flex-row items-center gap-3">
//                 <View className="items-center ">
//                   <Text className="text-sm font-rubik-bold text-secondary-100 px-4 py-2 bg-gray-100 rounded-full self-start">
//                     {car?.brand?.brandName}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//           {/* Price text overlay at the bottom of the image */}
//           <View className="absolute -bottom-12 w-full flex justify-center items-center z-50">
//             <Text className="text-2xl font-rubik-extrabold">{car?.name}</Text>

//             <View className="flex flex-row items-center gap-3">
//               <View className="flex flex-row items-center gap-2">
//                 <Text className="text-black-200 mt-1 font-rubik-medium">
//                   ({car?.category?.categoryName})
//                 </Text>
//               </View>
//             </View>
//             <Text className="text-2xl text-secondary-100 font-rubik-extrabold">
//               Ksh. {car?.price}/day
//             </Text>
//           </View>
//         </View>

//         <View className="px-5 mt-14 flex gap-2 h-full">
//           <View className="flex flex-row flex-wrap items-center mt-2 border-y border-gray-300 py-4">
//             {car?.features?.map((feature, index) => {
//               const icon =
//                 featureIcons[
//                   feature.featureName.toLowerCase() as keyof typeof featureIcons
//                 ] || icons.star;

//               return (
//                 <View
//                   key={index}
//                   className="flex flex-col items-center justify-center mb-2 gap-2 w-20 "
//                 >
//                   <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
//                     <Image source={icon} className="size-4" />
//                   </View>
//                   <Text className="text-black-300 text-center text-sm font-rubik-medium ml-2">
//                     {feature?.featureValue} {feature?.featureName}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>

//           <View className="mt-7">
//             <Text className="text-black-300 text-xl font-rubik-bold">
//               Overview
//             </Text>
//             <Text className="text-secondary-600 text-base font-rubik mt-2">
//               {car?.description}
//             </Text>
//           </View>

//           <View className="mt-7">
//             <Text className="text-black-300 text-xl font-rubik-bold">
//               Available addons
//             </Text>

//             <View className="flex-row mt-4">
//               {car?.addons?.map((addon, index) => {
//                 const icon =
//                   addonIcons[addon.addonName as keyof typeof addonIcons] ||
//                   "❓";

//                 return (
//                   <View
//                     key={index}
//                     className="flex flex-1 flex-col items-center min-w-16 max-w-20"
//                   >
//                     <Text className="text-xs text-secondary-600 font-rubik-medium">
//                       +{addon.addonValue}
//                     </Text>
//                     <View
//                       className={`size-14 rounded-full flex items-center justify-center bg-primary-100`}
//                     >
//                       <Text className="text-lg">{icon}</Text>
//                     </View>

//                     <Text
//                       numberOfLines={1}
//                       ellipsizeMode="tail"
//                       className="text-black-300 text-sm text-center font-rubik mt-1.5"
//                     >
//                       {addon.addonName}
//                     </Text>
//                   </View>
//                 );
//               })}
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
//         <View className="flex flex-row items-center justify-between gap-10">
//           <TouchableOpacity
//             onPress={() => router.replace(`/${id}/add-directions`)}
//             className="flex-1 flex flex-row items-center justify-center bg-secondary-100 py-3 rounded-full shadow-md shadow-zinc-400"
//           >
//             <Text className="text-white text-lg text-center font-rubik-bold">
//               Proceed to book
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default CarDetails;

// File: screens/CarDetails.tsx
// import React, { useRef } from "react";
// import { View, ScrollView, Text, Dimensions, Animated } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { useFetch } from "@/lib/fetch";
// import { Car } from "@/lib/definitions";
// import { CarDetailsHeader } from "@/components/car-details/CarDetailsHeader";
// import { CarDetailsFeatures } from "@/components/car-details/CarDetailsFeatures";
// import { CarDetailsOverview } from "@/components/car-details/CarDetailsOverview";
// import { CarDetailsAddons } from "@/components/car-details/CarDetailsAddons";
// import { CarDetailsFooter } from "@/components/car-details/CarDetailsFooter";

// const CarDetails = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const windowHeight = Dimensions.get("window").height;
//   const headerHeight = windowHeight / 2;

//   const scrollY = useRef(new Animated.Value(0)).current;
//   const animateHeight = scrollY.interpolate({
//     inputRange: [0, headerHeight],
//     outputRange: [headerHeight, 0],
//     extrapolate: "clamp",
//   });
//   const animateOpacity = scrollY.interpolate({
//     inputRange: [0, headerHeight / 2, headerHeight],
//     outputRange: [1, 0.5, 0],
//     extrapolate: "clamp",
//   });

//   const { data, loading, error } = useFetch<{ data: Car }>(`/(api)/car/${id}`, {
//     method: "GET",
//   });
//   const car = data?.data;
//   if (loading) return <Text className="text-center mt-4">Loading...</Text>;
//   if (error || !car)
//     return <Text className="text-center mt-4">Error loading car details.</Text>;

//   return (
//     <View className="h-full bg-white">
//       <Animated.ScrollView
//         showsVerticalScrollIndicator={false}
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         contentContainerStyle={{ paddingBottom: 200 }}
//       >
//         <Animated.View
//           style={{
//             height: animateHeight,
//             opacity: animateOpacity,
//             overflow: "hidden",
//           }}
//         >
//           <CarDetailsHeader car={car} />
//         </Animated.View>

//         <View
//           style={{
//             position: "absolute",
//             top: headerHeight - 40,
//             left: 20,
//             right: 20,
//             zIndex: 10,
//           }}
//         >
//           <View className="bg-white p-4 rounded-2xl shadow-lg">
//             <Text className="text-2xl font-extrabold text-gray-900 text-center">
//               {car.name}
//             </Text>
//             <Text className="text-sm text-gray-500 mt-1 text-center">
//               {car.category.categoryName}
//             </Text>
//             <Text className="mt-2 text-xl font-bold text-blue-500 text-center">{`Ksh. ${car.price}/day`}</Text>
//           </View>
//         </View>

//         <View className="px-5 mt-14">
//           <CarDetailsFeatures car={car} />
//           <CarDetailsOverview car={car} />
//           <CarDetailsAddons car={car} />
//         </View>
//       </Animated.ScrollView>

//       <CarDetailsFooter id={id!} />
//     </View>
//   );
// };

// export default CarDetails;

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
import { LiveChatSupport } from "@/components/LiveChatSupport";
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
