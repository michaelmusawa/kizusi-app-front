import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router } from "expo-router";

// Component for an individual FAQ item with toggleable answer
const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setOpen(!open)}
      activeOpacity={0.8}
      className="border-b border-gray-200 pb-3 mb-3"
    >
      <Text className="text-lg font-semibold text-gray-500">{question}</Text>
      {open && <Text className="text-gray-600 mt-2">{answer}</Text>}
    </TouchableOpacity>
  );
};

const Help = () => {
  const sections = [
    {
      title: "Booking & Cancellation",
      content: `• Book in advance through our app or customer service.
• Cancellations >2 days before pickup are free.
• 1-day prior cancellations incur a 20% fee.
• Same-day cancellations & no-shows are non-refundable.`,
    },
    {
      title: "Payment & Pricing",
      content: `• We accept cash, credit cards, mobile, and in-app payments.
• Additional charges for tolls, waiting time, or peak hours.
• Long trips have flat rates; city rides use metered pricing.`,
    },
    {
      title: "Waiting Time Charges",
      content: `• A 15-minute grace period is included.
• After 15 minutes, $1 is charged for every extra 3 minutes.`,
    },
    {
      title: "Passenger & Baggage Policy",
      content: `• Each vehicle has a specific passenger & luggage limit.
• Confirm limits during booking for large groups or heavy luggage.`,
    },
    {
      title: "Safety & Insurance",
      content: `• All rides are insured for your safety.
• Seatbelts must be worn at all times.
• Report any safety concerns to our support team.`,
    },
    {
      title: "Accessibility & Add-ons",
      content: `• Wheelchair-accessible vehicles & child seats available on request.
• Additional charges may apply for extra services.`,
    },
    {
      title: "Contact Support",
      content: `• For assistance, call our helpline or reach out via the app.
• We’re here for feedback, complaints, or lost items.`,
    },

    {
      title: "Terms & Conditions",
      content:
        "Review our terms and conditions for more details on our policies and procedures.",
    },
  ];
  // FAQ data defined as an array of question/answer objects
  const faqData = [
    {
      question: "How do I update my booking?",
      answer:
        "You can update your booking by navigating to your profile, selecting the booking, and tapping on 'Edit Booking'.",
    },
    {
      question: "What happens if I miss my ride?",
      answer:
        "If you miss your ride, please contact our support team immediately to reschedule your ride or to get further assistance.",
    },
    {
      question: "How is pricing calculated?",
      answer:
        "Pricing is calculated based on the distance traveled, time taken, and additional fees (e.g., tolls, waiting time, or peak hour surcharges).",
    },
    {
      question: "How do I contact customer service?",
      answer:
        "You can contact our customer service directly through the in-app support chat or by calling our helpline provided on the Contact Us page.",
    },
  ];

  const handlePress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URI: ${url}`);
    }
  };

  return (
    <ScrollView className="bg-gray-50 p-6">
      {/* Header */}
      <View className="flex flex-row items-center justify-between mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-3 bg-primary-200 rounded-full"
        >
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Help & Support</Text>
        {/* Placeholder to balance layout */}
        <View className="w-6" />
      </View>

      {/* Other help topics remain unchanged... */}

      {/* Help Sections */}
      {sections.map((section, index) => (
        <View
          key={index}
          className="mb-4 p-4 bg-white rounded-lg border border-gray-200"
        >
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            {section.title}
          </Text>
          <Text className="text-gray-600 whitespace-pre-line">
            {section.content}
          </Text>
        </View>
      ))}

      {/* FAQ Section with toggleable items */}
      <View className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </Text>
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </View>

      <View className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Contact Support
        </Text>
        <View className="gap-3">
          {/* Phone */}
          <TouchableOpacity
            onPress={() => handlePress("tel:+25412345678")}
            className="flex-row items-center"
          >
            <Image source={icons.phone} className="w-6 h-6 mr-3" />
            <Text className="text-gray-700 text-lg">+25412345678</Text>
          </TouchableOpacity>
          {/* WhatsApp */}
          <TouchableOpacity
            onPress={() => handlePress("whatsapp://send?phone=+25412345678")}
            className="flex-row items-center"
          >
            <Image source={icons.whatsapp} className="w-6 h-6 mr-3" />
            <Text className="text-gray-700 text-lg">+25412345678</Text>
          </TouchableOpacity>
          {/* Email */}
          <TouchableOpacity
            onPress={() => handlePress("mailto:support@example.com")}
            className="flex-row items-center"
          >
            <Image source={icons.email} className="w-6 h-6 mr-3" />
            <Text className="text-gray-700 text-lg">support@example.com</Text>
          </TouchableOpacity>
          {/* Facebook */}
          <TouchableOpacity
            onPress={() => handlePress("https://facebook.com/yourpage")}
            className="flex-row items-center"
          >
            <Image source={icons.facebook} className="w-6 h-6 mr-3" />
            <Text className="text-gray-700 text-lg">Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Help;
