import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SignIn = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { signIn, setActive, isLoaded } = useSignIn();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        if (id) {
          router.replace(`/(root)/${id}/book-details`);
        } else {
          router.replace("/(root)/(tabs)");
        }
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, form]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <View className="relative">
            <InputField
              label="Password"
              placeholder="Enter password"
              icon={icons.lock}
              secureTextEntry={showPassword ? false : true}
              textContentType="password"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />

            <TouchableOpacity
              className="absolute right-4 top-14 pt-2 cursor-pointer"
              onPress={togglePassword}
            >
              <Text>{showPassword ? "👁️" : "🙈"}</Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth id={id} />

          <Link
            href={id ? `/sign-up?${id}` : "/sign-up"}
            className="text-lg text-center text-general-200 mt-10"
          >
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
