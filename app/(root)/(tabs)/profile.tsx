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
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useFetch } from "@/lib/fetch";
import { User } from "@/lib/definitions";
import NoUserPage from "@/components/NoUserPage";

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

  const { user } = useUser();

  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.push("/(root)/(tabs)");
  };

  const {
    data: response,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(`/(api)/user/${user?.id}`, {
    method: "GET",
  });

  const returnedUser = response?.data;

  if (!user) {
    return <NoUserPage text={"Please login to view your profile"} />;
  }

  if (userLoading) {
    return <Text className="text-center mt-4">Loading...</Text>;
  }

  if (userError) {
    return <Text className="text-center mt-4">Error loading details.</Text>;
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-2xl font-rubik-ExtraBold">Profile</Text>
        </View>

        <View
          className="flex flex-row justify-center items-center mt-5"
          style={{ height: windowHeight / 2 }}
        >
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{
                uri:
                  returnedUser?.image ??
                  user?.externalAccounts?.[0]?.imageUrl ??
                  user?.imageUrl,
              }}
              className="size-44 relative rounded-full"
            />

            <Text className="text-2xl font-rubik-bold mt-2">
              {returnedUser?.name ?? user?.fullName}
            </Text>
            <Text className="text-xl font-rubik-medium mt-2">
              {returnedUser?.email ?? user?.primaryEmailAddress?.emailAddress}
            </Text>
            <Text className="text-xl font-rubik-medium mt-2">
              {returnedUser?.phone ??
                user?.primaryPhoneNumber ??
                "No phone number"}
            </Text>
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
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
