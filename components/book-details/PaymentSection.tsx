/* eslint-disable prettier/prettier */
// import React from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// import { Checkbox } from "@/components/CheckBox";
// import { RadioButton } from "@/components/RadioButton";
// import { icons } from "@/constants";

// type Props = {
//   amount: number;
//   paymentType: string;
//   setPaymentType: (val: string) => void;
//   paymentOption: string;
//   setPaymentOption: (val: string) => void;
//   isAgreed: boolean;
//   setIsAgreed: (val: boolean) => void;
//   error: string | null;
//   handlePayment: () => void;
// };

// const PaymentSection: React.FC<Props> = ({
//   amount,
//   paymentType,
//   setPaymentType,
//   paymentOption,
//   setPaymentOption,
//   isAgreed,
//   setIsAgreed,
//   error,
//   handlePayment,
// }) => {
//   return (
//     <View className="mt-7 px-5">
//       <Text className="text-black-300 text-xl font-rubik-bold">
//         Payment method
//       </Text>
//       <View className="flex-row justify-between mt-4">
//         <View className="flex-1">
//           <RadioButton
//             label="Full amount"
//             value="full"
//             selected={paymentType === "full"}
//             onSelect={setPaymentType}
//           />
//           <RadioButton
//             label="Reserve"
//             value="reserve"
//             selected={paymentType === "reserve"}
//             onSelect={setPaymentType}
//           />
//         </View>

//         <View className="flex-1 flex-row">
//           {[
//             {
//               icon: icons.pesapal,
//               label: "Pesapal",
//               value: "pesapal",
//             },
//           ].map((addon, index) => (
//             <View
//               key={index}
//               className="flex flex-1 flex-col items-center min-w-16 max-w-20"
//             >
//               <TouchableOpacity
//                 key={index}
//                 onPress={() => setPaymentOption(addon.value)}
//                 className={`flex-1 items-center p-2 rounded-full ${
//                   paymentOption === addon.value
//                     ? "bg-gray-100"
//                     : "bg-gray-100/50"
//                 }`}
//               >
//                 <Image
//                   source={addon.icon}
//                   alt={addon.label}
//                   resizeMode="contain"
//                 />
//                 <Text className="text-sm font-rubik mt-1">{addon.label}</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Terms & Conditions */}
//       <View className="mt-6">
//         <Text className="text-black-300 text-xl font-rubik-bold">
//           Terms & conditions
//         </Text>
//         <Checkbox
//           checked={isAgreed}
//           onChange={(checked) => setIsAgreed(checked)}
//         />
//         {error && (
//           <Text className="text-red-500 text-base font-rubik-semiBold mt-1">
//             {error}
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// };

// export default PaymentSection;

import React from "react";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { Checkbox } from "@/components/CheckBox";
import { icons } from "@/constants";
import RefundNotice from "../history-details/RefundNotice";

type Props = {
  amount: number;
  paymentType: string;
  paymentStatus?: string;
  onPay?: () => void;
  setPaymentType?: (val: string) => void;
  paymentOption?: string;
  setPaymentOption?: (val: string) => void;
  isAgreed?: boolean;
  setIsAgreed?: (val: boolean) => void;
  error?: string | null;
};

const PaymentSection: React.FC<Props> = ({
  amount,
  paymentType,
  paymentStatus,
  onPay,
  setPaymentType,
  paymentOption,
  setPaymentOption,
  isAgreed,
  setIsAgreed,
  error,
}) => (
  <View className="mt-5">
    {/* Card Container */}
    <View className="bg-white rounded-2xl shadow-md p-5 space-y-6">
      {/* Section Title */}
      <Text className="text-lg font-semibold text-gray-800 mb-4">
        Payment Method
      </Text>

      {/* Segmented Control for Full / Reserve */}

      <View className="flex-row bg-gray-100 rounded-full p-1">
        {["full", "reserve"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() =>
              setPaymentType &&
              setPaymentType(type === "full" ? "full" : "reserve")
            }
            className={`flex-1 py-2 items-center rounded-full ${
              paymentType === type ? "bg-white" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                paymentType === type ? "text-primary-500" : "text-gray-600"
              }`}
            >
              {type === "full" ? "Full Amount" : "Reserve"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payment Option Icons */}
      <View className="flex-row justify-around mt-2">
        {[{ icon: icons.pesapal, label: "Pesapal", value: "pesapal" }].map(
          ({ icon, label, value }) => (
            <Pressable
              key={value}
              onPress={() =>
                setPaymentOption && setPaymentOption(value as "pesapal")
              }
              className={`w-28 h-20 items-center justify-center rounded-xl border-2 ${
                paymentOption === value
                  ? "border-primary-300 bg-primary-50"
                  : "border-gray-200 bg-gray-100"
              }`}
            >
              <Image source={icon} className="w-14 h-8 mb-1" />
              <Text className="text-xs font-medium text-gray-700">{label}</Text>
            </Pressable>
          )
        )}
      </View>

      {/* Terms & Conditions */}

      {!paymentStatus && (
        <>
          <View className="items-center space-x-3">
            <Checkbox
              checked={isAgreed ?? false}
              onChange={setIsAgreed ?? (() => {})}
            />
          </View>
          {error && (
            <Text className="text-red-500 text-sm font-semibold text-center">
              {error}
            </Text>
          )}
        </>
      )}

      {paymentType === "reserve" && paymentStatus === "CONFIRMED" && (
        <RefundNotice amount={amount} onPay={onPay ?? (() => {})} />
      )}

      {/* Pay Now Button */}
      {/* <LinearGradient
        colors={["#4F46E5", "#22C55E"]}
        start={[0, 0]}
        end={[1, 0]}
        className="rounded-full"
        style={{ overflow: "hidden" }}
      >
        <Pressable
          onPress={handlePayment}
          android_ripple={{ color: "rgba(255,255,255,0.3)" }}
          className="py-3 items-center"
        >
          <Text className="text-white text-lg font-bold">
            Pay Ksh. {amount}
          </Text>
        </Pressable>
      </LinearGradient>  */}
    </View>
  </View>
);

export default PaymentSection;
