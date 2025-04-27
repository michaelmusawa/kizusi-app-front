// File: components/AI.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import { useChat } from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import { icons } from "@/constants";

export const AI: React.FC = () => {
  const { messages, error, handleInputChange, input, isLoading, handleSubmit } =
    useChat({
      fetch: expoFetch as unknown as typeof globalThis.fetch,
      api: "http://192.168.88.226:3000/api/chat",
      onError: (error) => console.error(error, "ERROR"),
      maxSteps: 5,
    });

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isLoading]);

  if (error) return <Text>{error.message}</Text>;

  return (
    <View className="mt-2">
      {/* Message List */}
      <ScrollView
        ref={scrollRef}
        className="mb-4"
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {messages.map((m) => (
          <View
            key={m.id}
            className={`p-4 rounded-lg mb-2 ${
              m.role === "assistant" ? "bg-blue-50" : "bg-gray-100 ml-8"
            }`}
          >
            <View className="flex-row items-start gap-2">
              {m.role === "assistant" && (
                <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
                  <Image source={icons.ai} className="size-5" />
                </View>
              )}
              <Text className="text-gray-800 whitespace-pre-wrap">
                {m.content}
              </Text>
            </View>
          </View>
        ))}

        {/* Loading State */}
        {isLoading && (
          <View className="p-4 rounded-lg mb-2 bg-blue-50 flex-row items-center gap-2">
            <ActivityIndicator />
            <Text className="text-gray-500">AI is thinking...</Text>
          </View>
        )}

        {/* Error State */}
        {error && (
          <View className="p-4 rounded-lg mb-2 bg-red-50">
            <Text className="text-red-600 dark:text-red-300">
              Error: {error}
            </Text>
          </View>
        )}
      </ScrollView>

      <View className="relative">
        <TextInput
          placeholder="Say something..."
          value={input}
          onChangeText={(text) =>
            handleInputChange({
              target: { value: text },
            } as unknown as React.ChangeEvent<HTMLInputElement>)
          }
          onSubmitEditing={(e) => {
            handleSubmit(e);
            e.preventDefault();
          }}
          returnKeyType="send"
          blurOnSubmit={false}
          editable={!isLoading}
          multiline
          numberOfLines={4}
          autoFocus
          className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 p-4 pr-14"
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          disabled={isLoading}
          className="absolute right-3 top-4 p-2"
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AI;
