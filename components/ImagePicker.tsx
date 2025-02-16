import { useState } from "react";
import { Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample({ setForm }) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request permissions to access the camera roll (important for iOS)
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Set the picked image in the local state
      setImage(result.assets[0].uri);
      // Update the parent form state with the selected image
      setForm(result.assets[0].uri);
    }
  };

  return (
    <View className="mt-2 border border-gray-300 bg-gray-50 py-1 px-2 rounded-lg">
      <Text onPress={pickImage} className="text-base font-rubik-semiBold">
        Pick an image
      </Text>
    </View>
  );
}
