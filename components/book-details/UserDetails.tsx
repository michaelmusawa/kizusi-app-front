// import React from "react";
// import { View, Text, Image } from "react-native";
// import { User } from "@/lib/definitions";

// type Props = {
//   user: any; // from Clerk
//   returnedUser?: User | null;
// };

// const UserDetails: React.FC<Props> = ({ user, returnedUser }) => {
//   // Fallbacks: externalAccounts, primaryEmailAddress, etc.
//   const photoUri =
//     returnedUser?.image ??
//     user?.externalAccounts?.[0]?.imageUrl ??
//     user?.imageUrl;
//   const name = returnedUser?.name ?? user?.fullName ?? "No name available";
//   const email =
//     returnedUser?.email ??
//     user?.primaryEmailAddress?.emailAddress ??
//     "No email available";
//   const phone =
//     returnedUser?.phone ??
//     user?.primaryPhoneNumber?.phoneNumber ??
//     "No phone available";

//   return (
//     <View className="w-full mt-7 px-5">
//       <Text className="text-black-300 text-xl font-rubik-bold">
//         Your details
//       </Text>
//       <View className="flex flex-row items-center justify-start mt-4">
//         <Image
//           source={{ uri: photoUri }}
//           className="size-14 rounded-full border border-secondary-100"
//         />
//         <View className="ml-7">
//           <Text className="text-lg font-rubik-bold">{name}</Text>
//           <Text className="text-sm font-rubik-medium">{email}</Text>
//           <Text className="text-lg font-rubik-medium mt-2">{phone}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default UserDetails;

import React from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "@/lib/definitions";

type Props = {
  user: any; // from Clerk
  returnedUser?: User | null;
};

export const UserDetails: React.FC<Props> = ({ user, returnedUser }) => {
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
    <View>
      <View className="w-2/3 max-w-md mx-auto mt-5 rounded-3xl overflow-hidden bg-gray-50 shadow-md">
        {/* Gradient Header */}
        <LinearGradient
          colors={["#4F46E5", "#22C55E"]}
          start={[0, 0]}
          end={[1, 0]}
          className="h-32 rounded-b-full z-40"
        >
          {/* Avatar overlaps header and panel */}
          <View className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <Image
              source={{ uri: photoUri }}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
          </View>
        </LinearGradient>

        {/* Details Panel */}
        <View className="p-5 shadow-lg">
          <Text className="text-center text-xl font-bold text-gray-800">
            {name}
          </Text>
          <Text className="mt-2 text-center text-sm text-gray-600">
            {email}
          </Text>
          <Text className="mt-1 text-center text-sm text-gray-600">
            {phone}
          </Text>
        </View>
      </View>
    </View>
  );
};
