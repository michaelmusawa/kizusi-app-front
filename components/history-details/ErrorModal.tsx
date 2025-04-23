import React from "react";
import { View, Text, Image } from "react-native";
import ReactNativeModal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  primaryText?: string;
};

const ErrorModal: React.FC<Props> = ({
  isVisible,
  onClose,
  primaryText = "Close",
}) => (
  <ReactNativeModal isVisible={isVisible}>
    <View className="bg-white px-7 py-9 rounded-2xl">
      <Image
        source={images.error}
        className="w-[110px] h-[110px] mx-auto my-5"
      />
      <Text className="text-3xl font-JakartaBold text-center">
        Error occurred
      </Text>
      <Text className="text-base text-gray-400 text-center mt-2">
        An error occurred during processing. Please try again or contact
        support.
      </Text>
      <CustomButton title={primaryText} onPress={onClose} className="mt-5" />
    </View>
  </ReactNativeModal>
);

export default ErrorModal;
