import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";

export default function Onboarding() {
  const swiperRef = useRef<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <View className="flex-1 relative">
      {/* Gradient covering the whole screen with reduced opacity */}
      <LinearGradient
        colors={["rgba(253,235,113,0.1)", "rgba(248,216,0,0.7)"]}
        className="absolute inset-0"
      />
      <SafeAreaView className="flex-1 justify-between px-5">
        {/* Skip Button */}
        <TouchableOpacity
          onPress={() => router.replace("/(root)/(tabs)")}
          className="flex justify-center items-center rounded-lg mt-2 self-end px-2 py-1"
        >
          <Text className="text-gray-700 text-md font-JakartaExtraBold">
            Skip
          </Text>
        </TouchableOpacity>

        {/* Swiper */}
        <View className="flex-1 justify-center">
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View className="w-6 h-1 mx-1 bg-gray-300 rounded-full" />}
            activeDot={<View className="w-6 h-1 mx-1 bg-white rounded-full" />}
            onIndexChanged={(index) => setActiveIndex(index)}
          >
            {onboarding.map((item) => (
              <View
                key={item.id}
                className="flex-1 justify-center items-center px-5"
              >
                <Image
                  source={item.image}
                  className="w-11/12 h-60"
                  resizeMode="contain"
                />
                <Text className="mt-8 text-3xl font-bold text-white text-center">
                  {item.title}
                </Text>
                <Text className="mt-4 text-base text-white text-center">
                  {item.description}
                </Text>
              </View>
            ))}
          </Swiper>
        </View>

        {/* Next / Get Started Button */}
        <View className="mb-10">
          <CustomButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={() =>
              isLastSlide
                ? router.replace("/(root)/(tabs)")
                : swiperRef.current?.scrollBy(1)
            }
            className="w-full"
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
