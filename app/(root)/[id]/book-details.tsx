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
import { Car, User } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/CheckBox";
import { RadioButton } from "@/components/RadioButton";
import { initiatePayment } from "@/lib/fetch";
import { addonIcons } from "@/constants/data";
import { useLocationStore } from "@/store";
import { useUser } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import uuid from "react-native-uuid";

const BookDetails = () => {
  const { user } = useUser();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [paymentOption, setPaymentOption] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("full");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const {
    userAddons,
    date,
    departureAddress,
    destinationAddress,
    bookType,
    rideDetails,
  } = useLocationStore();

  const addonsAmount = userAddons.length * 20;

  const {
    data: carResponse,
    loading: carLoading,
    error: carError,
  } = useFetch<Car>(`/(api)/car/${id}`, {
    method: "GET",
  });

  const car = carResponse?.data;

  if (!user) {
    router.replace(
      `/(auth)/sign-up?id=${id}&query=add_userDetails&callback=true`
    );
  }

  const {
    data: response,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(`/(api)/user/${user?.id}`, {
    method: "GET",
  });

  const returnedUser = response?.data;

  const windowHeight = Dimensions.get("window").height;

  const handleCheckboxChange = (checked: boolean) => {
    setIsAgreed(checked);
  };

  const handleSelect = (value: string) => {
    setPaymentOption(value);
  };

  const handleSelectPaymentType = (value: string) => {
    setPaymentType(value);
  };

  let rideAmount = 0;

  if (bookType === "full_day") {
    rideAmount = car?.price || 0;
  } else if (rideDetails?.time && car?.price) {
    rideAmount = (rideDetails.time * car?.price) / 1440;
  }

  useEffect(() => {
    if (paymentType === "full") {
      setPaymentAmount(rideAmount + addonsAmount);
    } else if (paymentType === "reserve") {
      setPaymentAmount((rideAmount + addonsAmount) / 2);
    }
  }, [rideAmount, addonsAmount, paymentType]);

  const handlePayment = async () => {
    if (!isAgreed) {
      setError("You have to agree with the terms and conditions to continue");
      return;
    }

    console.log("im here");
    const reference = uuid.v4();
    console.log("reference", reference);
    const paymentData = {
      amount: paymentAmount.toFixed(2),
      first_name: user?.firstName,
      last_name: user?.lastName,
      email: returnedUser.email,
      phoneNumber: returnedUser.phone,
      carId: id,
      reference: reference,
      userId: user?.id,
      bookingDate: date,
      departure: departureAddress,
      destination: destinationAddress,
      bookType: bookType,
      paymentType: paymentType,
      addons: userAddons,
      description: "Car Rental Payment",
      callbackUrl: Linking.createURL(
        `/(root)/${reference}/history-details?query=${id}&callback=true`
      ),
    };

    console.log(paymentData);

    try {
      await initiatePayment(paymentData);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  if (userLoading || carLoading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  if (userError || carError) {
    return <Text className="text-center mt-4">Error loading details.</Text>;
  }

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

          <View className="w-full mt-4">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Your details
            </Text>

            <View className="flex flex-row items-center justify-between mt-4">
              <View className="flex flex-row items-center">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1606814893907-c2e42943c91f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
                  }}
                  className="size-14 rounded-full border border-secondary-100"
                />

                <View className="flex flex-col items-start justify-center ml-7">
                  <Text className="text-lg text-black-300 text-start font-rubik-bold">
                    {returnedUser?.name}
                  </Text>
                  <Text className="text-sm text-black-200 text-start font-rubik-medium">
                    {returnedUser?.email}
                  </Text>
                  <Text className="text-sm text-black-200 text-start font-rubik-medium">
                    {returnedUser?.phone}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Directions
            </Text>

            <View className="flex w-full mt-4 px-3 py-4 rounded-lg relative border">
              <View className="flex flex-row gap-2 items-center">
                {/* Image section */}
                <Image
                  source={{ uri: "" }}
                  className="w-1/3 h-32 rounded-lg border"
                />

                <View className="flex flex-col mt-2 gap-2 border w-full">
                  {/* From section */}
                  <View className="flex flex-row gap-2 items-center w-full">
                    <Image source={icons.pin} className="w-4 h-5" />
                    <Text className="flex text-base font-rubik-bold text-black-300 flex-wrap">
                      From: {departureAddress}
                    </Text>
                  </View>

                  {/* To section */}
                  <View className="flex flex-row gap-2 items-center w-full">
                    <Image source={icons.marker} className="w-4 h-5" />
                    <Text className="text-base font-rubik-bold text-black-300 flex-wrap">
                      To: {destinationAddress}
                    </Text>
                  </View>

                  {/* Date and book type */}
                  <View className="flex flex-row items-center justify-between mt-2 w-full">
                    <Text className="text-base font-rubik-bold text-secondary-100">
                      Date: {date.toLocaleDateString()},{" "}
                      {date.toLocaleTimeString()}
                    </Text>

                    <View className="flex flex-row items-center justify-between mt-2">
                      <Text className="text-base font-rubik-bold text-secondary-100">
                        {bookType}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
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
                    key={index}
                    className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                  >
                    <Text className="text-xs text-secondary-600 font-rubik-medium">
                      +20/=
                    </Text>
                    <View
                      className={`size-14 rounded-full flex items-center justify-center ${
                        userAddons?.includes(addon.addonName)
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
            {userAddons.length > 0 && (
              <Text className="text-secondary-100 text-sm text-center font-rubik mt-2">
                Addons amount: {addonsAmount}/=
              </Text>
            )}
          </View>

          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Payment method
            </Text>

            <View className="flex-row justify-between mt-2">
              <View className="flex flex-row w-full border p-4">
                <View className="flex-1">
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
                <View className="flex-1 flex-row mt-4">
                  {[
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
                            ? "bg-gray-100 rounded-full flex items-center justify-center p-2"
                            : "bg-gray-100 rounded-full flex items-center justify-center p-2"
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
            {error && (
              <Text className="text-red-500 text-base font-rubik-semiBold">
                {error}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 py-4 px-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-secondary-100 text-start text-2xl font-rubik-bold"
            >
              ${paymentAmount}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handlePayment}
            className="flex-1 flex flex-row items-center justify-center bg-secondary-100/70 py-2 rounded-full shadow-md shadow-zinc-400"
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

export default BookDetails;
