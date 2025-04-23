import React from "react";
import { View, Text, Image } from "react-native";
import { User } from "@/lib/definitions";

type Props = {
  user: any; // from Clerk
  returnedUser?: User | null;
};

const UserDetails: React.FC<Props> = ({ user, returnedUser }) => {
  // Fallbacks: externalAccounts, primaryEmailAddress, etc.
  const photoUri =
    returnedUser?.image ??
    user?.externalAccounts?.[0]?.imageUrl ??
    user?.imageUrl;
  const name = returnedUser?.name ?? user?.fullName ?? "No name available";
  const email =
    returnedUser?.email ??
    user?.primaryEmailAddress?.emailAddress ??
    "No email available";
  const phone =
    returnedUser?.phone ??
    user?.primaryPhoneNumber?.phoneNumber ??
    "No phone available";

  return (
    <View className="w-full mt-7 px-5">
      <Text className="text-black-300 text-xl font-rubik-bold">
        Your details
      </Text>
      <View className="flex flex-row items-center justify-start mt-4">
        <Image
          source={{ uri: photoUri }}
          className="size-14 rounded-full border border-secondary-100"
        />
        <View className="ml-7">
          <Text className="text-lg font-rubik-bold">{name}</Text>
          <Text className="text-sm font-rubik-medium">{email}</Text>
          <Text className="text-lg font-rubik-medium mt-2">{phone}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;
