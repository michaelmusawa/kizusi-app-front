import React from "react";
import { View, Text, Image } from "react-native";
import ReactNativeModal from "react-native-modal";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

type Props = {
  isVisible: boolean;
  imageSource: any;
  title: string;
  message: string;
  primaryText: string;
  onPrimary: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
};

const SuccessModal: React.FC<Props> = ({
  isVisible,
  imageSource,
  title,
  message,
  primaryText,
  onPrimary,
  secondaryText,
  onSecondary,
}) => (
  <ReactNativeModal isVisible={isVisible}>
    <View className="bg-white px-7 py-9 rounded-2xl">
      <Image
        source={imageSource}
        className="w-[110px] h-[110px] mx-auto my-5"
      />
      <Text className="text-3xl font-JakartaBold text-center">{title}</Text>
      <Text className="text-base text-gray-400 text-center mt-2">
        {message}
      </Text>
      <CustomButton title={primaryText} onPress={onPrimary} className="mt-5" />
      {secondaryText && onSecondary && (
        <CustomButton
          title={secondaryText}
          onPress={onSecondary}
          className="mt-3"
        />
      )}
    </View>
  </ReactNativeModal>
);

export default SuccessModal;
