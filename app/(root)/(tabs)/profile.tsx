import {
  Alert,
  Dimensions,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "@/constants/index";
import { router } from "expo-router";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
        </View>

        <View
          className="flex flex-row justify-center items-center mt-5"
          style={{ height: windowHeight / 2 }}
        >
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1606814893907-c2e42943c91f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
              }}
              className="size-44 relative rounded-full"
            />

            <Text className="text-2xl font-rubik-bold mt-2">Joe Doe</Text>
            <Text className="text-xl font-rubik-medium mt-2">
              doe@gmail.com
            </Text>
            <Text className="text-xl font-rubik-medium mt-2">0712345678</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10 border-t border-primary-200">
          <SettingsItem
            icon={icons.calender}
            title="My Bookings"
            onPress={() => {
              router.push("/history");
            }}
          />
          <SettingsItem
            icon={icons.person}
            title="Profile"
            onPress={() => {
              router.push("/(root)/profileForm");
            }}
          />
          <SettingsItem
            icon={icons.help}
            title="Help Center"
            onPress={() => {
              router.push("/(root)/help");
            }}
          />
        </View>

        <View className="flex flex-col border-t mt-5 pt-5 border-primary-200">
          <SettingsItem
            icon={icons.out}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            // onPress={}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

// import { useUser } from "@clerk/clerk-expo";
// import { Image, ScrollView, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import InputField from "@/components/InputField";

// const Profile = () => {
//   const { user } = useUser();

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView
//         className="px-5"
//         contentContainerStyle={{ paddingBottom: 120 }}
//       >
//         <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

//         <View className="flex items-center justify-center my-5">
//           <Image
//             source={{
//               uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
//             }}
//             style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
//             className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
//           />
//         </View>

//         <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
//           <View className="flex flex-col items-start justify-start w-full">
//             <InputField
//               label="First name"
//               placeholder={user?.firstName || "Not Found"}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Last name"
//               placeholder={user?.lastName || "Not Found"}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Email"
//               placeholder={
//                 user?.primaryEmailAddress?.emailAddress || "Not Found"
//               }
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Phone"
//               placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Profile;
