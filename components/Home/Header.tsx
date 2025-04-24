import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { icons } from "@/constants";
import { useCurrentUser } from "@/hook/useCurrentUser";

export const Header = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { returnedUser, loading, error } = useCurrentUser(user?.id);

  return (
    <View className="flex-row items-center justify-between px-5 mt-5">
      <TouchableOpacity
        onPress={
          user
            ? signOut
            : () => {
                /* navigate to sign-in */
              }
        }
      >
        <View className="rounded-full size-10 items-center justify-center border border-secondary-100">
          {loading ? (
            <Text className="text-xs">Loading..</Text>
          ) : (
            <Image
              source={
                user
                  ? { uri: returnedUser?.image || user.imageUrl }
                  : icons.login
              }
              className={user ? "size-8 rounded-full" : "size-5 rounded-full"}
            />
          )}
        </View>
        <Text className="text-xs mt-1 text-center">
          {user ? "Logout" : "Login"}
        </Text>
      </TouchableOpacity>
      <View>
        <Text className="text-xs">
          {new Date().getHours() < 12 ? "Good Morning," : "Good Evening,"}
        </Text>
        <Text className="text-base font-rubik-medium">
          {user ? returnedUser?.name || user.fullName : "Welcome"}
        </Text>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL("https://google.com")}>
        <Text className="text-secondary-100">For self drive →</Text>
      </TouchableOpacity>
    </View>
  );
};
