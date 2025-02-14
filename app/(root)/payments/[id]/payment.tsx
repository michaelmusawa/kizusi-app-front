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
import { Checkbox } from "@/components/CheckBox";
import { RadioButton } from "@/components/RadioButton";
import { initiatePayment } from "@/lib/fetch";
import * as Linking from "expo-linking";

const Payment = () => {
  useEffect(() => {
    const handleDeepLink = (event) => {
      const { url } = event;

      console.log("Dem call back url", url);
      const data = Linking.parse(url);

      if (data.queryParams) {
        const { status, transactionId } = data.queryParams;
        console.log("Payment callback data:", { status, transactionId });

        // Process the payment status here
        if (status === "success") {
          // Handle success logic
        } else {
          // Handle failure logic
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const [paymentOption, setPaymentOption] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("Full payment");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsAgreed(checked);
  };

  const handleSelect = (value: string) => {
    setPaymentOption(value);
  };

  const handleSelectPaymentType = (value: string) => {
    setPaymentType(value);
  };

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

  const handlePayment = async () => {
    const id = new Date();
    const paymentData = {
      amount: "10",
      email: "user@example.com",
      phoneNumber: "254700123456",
      reference: id,
      description: "Car Rental Payment",
      callbackUrl: "kizusi.app://payment-response",
    };

    try {
      await initiatePayment(paymentData);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View
          className="relative w-full flex justify-center items-center"
          style={{ height: windowHeight / 4 }}
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

        <View className="px-5 mt-7 flex gap-2">
          <Text className="text-2xl font-rubik-extrabold">{car?.name}</Text>

          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {car?.brand}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                {5} ({1300} reviews)
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center mt-5">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Image source={icons.door} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {car?.door} Doors
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.seat} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {car?.seat} Seats
            </Text>
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Image source={icons.speed} className="size-4" />
            </View>
            <Text className="text-black-300 text-sm font-rubik-medium ml-2">
              {car?.speed} km/hr
            </Text>
          </View>

          <View className="w-full border-t border-primary-200 pt-7 mt-5">
            <Text className="text-black-300 text-xl font-rubik-bold">You</Text>

            <View className="flex flex-row items-center justify-between mt-4">
              <View className="flex flex-row items-center">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1606814893907-c2e42943c91f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
                  }}
                  className="size-14 rounded-full"
                />

                <View className="flex flex-col items-start justify-center ml-3">
                  <Text className="text-lg text-black-300 text-start font-rubik-bold">
                    John Doe
                  </Text>
                  <Text className="text-sm text-black-200 text-start font-rubik-medium">
                    john@example.com
                  </Text>
                  <Text className="text-sm text-black-200 text-start font-rubik-medium">
                    +254712345678
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Directions
            </Text>
            <TouchableOpacity className="flex w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative">
              <View className="flex flex-row gap-2 items-center">
                <Image
                  source={{ uri: "" }}
                  className="w-1/3 h-32 rounded-lg border"
                />

                <View className="flex flex-col mt-2 gap-2">
                  <View className="flex flex-row gap-2 items-center">
                    <Image source={icons.pin} className="w-4 h-5" />
                    <Text className="text-base font-rubik-bold text-black-300">
                      From: Samburu, west pokot
                    </Text>
                  </View>

                  <View className="flex flex-row gap-2 items-center">
                    <Image source={icons.marker} className="w-4 h-5" />
                    <Text className="text-base font-rubik-bold text-black-300">
                      To: Syokimau, Nandi east
                    </Text>
                  </View>

                  <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-base font-rubik-bold text-primary-300">
                      22/01/2025, 22:36
                    </Text>

                    <View className="flex flex-row items-center justify-between mt-2">
                      <Text className="text-base font-rubik-bold text-primary-300">
                        Transfer
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Addons
            </Text>

            <View className="flex-row justify-between mt-4">
              {[
                { icon: "➕", label: "Add" },
                { icon: "📶", label: "Bluetooth" },
                { icon: "💧", label: "Water" },
                { icon: "⚡", label: "Charger" },
              ].map((addon, index) => (
                <View
                  key={index}
                  className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                >
                  <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                    <Text className="6">{addon.icon}</Text>
                  </View>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-black-300 text-sm text-center font-rubik mt-1.5"
                  >
                    {addon.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Payment method
            </Text>

            <View className="flex-col justify-between mt-4">
              <View className="flex flex-1 flex-col min-w-16 max-w-20">
                <RadioButton
                  label="Full amount"
                  value="full"
                  selected={paymentType === "full"}
                  onSelect={handleSelectPaymentType}
                />
              </View>

              <View className="flex flex-1 flex-col min-w-16 max-w-20">
                <RadioButton
                  label="Reserve"
                  value="reserve"
                  selected={paymentType === "reserve"}
                  onSelect={handleSelectPaymentType}
                />
              </View>
            </View>

            <View className="flex-row justify-around mt-4">
              {[
                { icon: icons.mpesa, label: "M-pesa", value: "mpesa" },
                { icon: icons.pesapal, label: "Pesapal", value: "pesapal" },
              ].map((addon, index) => (
                <View
                  key={index}
                  className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                >
                  <TouchableOpacity
                    onPress={(e) => handleSelect(addon.value)}
                    className={
                      paymentOption === addon.value
                        ? "bg-primary-100 rounded-full flex items-center justify-center p-2 border border-red-500"
                        : "bg-primary-100 rounded-full flex items-center justify-center p-2"
                    }
                  >
                    <Image
                      source={addon.icon}
                      alt={addon.label}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-black-300 text-sm text-center font-rubik mt-1.5"
                  >
                    {addon.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Terms & conditions
            </Text>

            <Checkbox
              label="I consent to the terms and conditions associated with use of this application and payment procedures"
              checked={isAgreed}
              onChange={handleCheckboxChange}
            />
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
            onPress={handlePayment}
            className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400"
          >
            <Text className="text-white text-lg text-center font-rubik-bold">
              Check out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Payment;
