// File: components/AI.tsx
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

// Dummy message data
const initialMessages = [
  { id: "1", role: "user", content: "Hi, can you help me with the form?" },
  { id: "2", role: "assistant", content: "Sure! What would you like to know?" },
  { id: "3", role: "user", content: "How do I select a date?" },
  {
    id: "4",
    role: "assistant",
    content: "You can tap the date field to open the date picker.",
  },
];

export const AI: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isLoading]);

  const handleInputChange = (text: string) => setInput(text);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    // Simulate assistant response
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "This is a dummy response.",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <View className="flex-1">
      {/* Message List */}
      <ScrollView
        ref={scrollRef}
        className="flex-1 mb-4"
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`p-4 rounded-lg mb-2 ${
              msg.role === "assistant" ? "bg-blue-50" : "bg-gray-100 ml-8"
            }`}
          >
            <View className="flex-row items-start gap-2">
              {msg.role === "assistant" && (
                <View className="w-8 h-8 rounded-full bg-blue-500 items-center justify-center">
                  {/* <AtIcon className="w-4 h-4 text-white" /> */}
                </View>
              )}
              <Text className="text-gray-800 whitespace-pre-wrap">
                {msg.content}
              </Text>
            </View>
          </View>
        ))}

        {/* Loading State */}
        {isLoading && (
          <View className="p-4 rounded-lg mb-2 bg-blue-50 flex-row items-center gap-2">
            <ActivityIndicator />
            <Text className="text-gray-500 ">AI is thinking...</Text>
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

      {/* Input Area */}
      <View className="relative">
        <TextInput
          value={input}
          onChangeText={handleInputChange}
          placeholder="Ask anything about the form?"
          className="w-full rounded-lg border border-gray-300 0 bg-white text-gray-900  p-4 pr-14"
          editable={!isLoading}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading}
          className="absolute right-3 top-4 p-2"
        >
          {/* <SendIcon className={`${isLoading ? 'text-gray-400' : 'text-blue-600'}`} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AI;
