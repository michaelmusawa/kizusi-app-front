import CustomButton from "@/components/CustomButton";
import ImagePickerExample from "@/components/ImagePicker";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { User } from "@/lib/definitions";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function ProfileForm() {
  const windowHeight = Dimensions.get("window").height;

  const { user } = useUser();
  const [pickedImage, setPickedImage] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const {
    data: response,
    loading: userLoading,
    error: userError,
  } = useFetch<{ data: User }>(`/(api)/user/${user?.id}`, {
    method: "GET",
  });

  const returnedUser = response?.data;

  console.log("the motherfucker", returnedUser);

  const [form, setForm] = useState({
    name: returnedUser?.name ?? user?.fullName ?? "",
    email: returnedUser?.email ?? user?.primaryEmailAddress?.emailAddress ?? "",
    password: returnedUser?.password ?? "",
    phone: returnedUser?.phone ?? user?.primaryPhoneNumber?.phoneNumber ?? "",
    image:
      pickedImage ??
      returnedUser?.image ??
      user?.externalAccounts?.[0]?.imageUrl ??
      user?.imageUrl ??
      "",
  });

  useEffect(() => {
    if (pickedImage !== null) {
      setForm({ ...form, image: pickedImage });
    }
  }, [form, pickedImage]);

  if (userLoading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  if (userError) {
    return <Text className="text-center mt-4">Error loading details.</Text>;
  }

  const handleSubmit = async () => {
    if (form.name === "") {
      setError("Please enter a name");
      return;
    }
    setError(null);

    try {
      // Make the API request
      const response = await fetchAPI(`/(api)/user/${user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          image: form.image,
        }),
      });

      // Handle the response (check for success/failure)
      if (response.status !== 200) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
      } else {
        alert("Profile updated successfully");
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
      setError("Network error, please try again later.");
    }
    setError(null);
  };

  console.log("the motherfucker phone", form.phone);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-32 bg-white"
    >
      <View
        className="relative flex flex-row justify-center items-center mt-5"
        style={{ height: windowHeight / 3 }}
      >
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
          </View>
        </View>

        <View className="flex flex-col items-center relative mt-5">
          {pickedImage ? (
            <Image
              source={{
                uri: pickedImage,
              }}
              className="size-44 relative rounded-full"
            />
          ) : (
            <Image
              source={{
                uri:
                  returnedUser?.image ??
                  user?.externalAccounts?.[0]?.imageUrl ??
                  user?.imageUrl,
              }}
              className="size-44 relative rounded-full"
            />
          )}

          <ImagePickerExample setForm={setPickedImage} />
        </View>
      </View>
      <View className="flex-1 bg-white">
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            editable={false}
            pointerEvents="none"
            className="text-gray-300"
            style={{ color: "gray" }}
          />
          <InputField
            label="Phone"
            placeholder="Enter your phone number"
            icon={icons.phone}
            value={form.phone}
            onChangeText={(value) => setForm({ ...form, phone: value })}
          />

          {error && (
            <Text className="text-base text-red-500 font-rubik-medium mt-2">
              {error}
            </Text>
          )}
          <CustomButton
            title="Submit"
            onPress={handleSubmit}
            className="mt-6"
          />
        </View>
      </View>
    </ScrollView>
  );
}
