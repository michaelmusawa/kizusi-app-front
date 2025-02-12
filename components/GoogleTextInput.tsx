import React, { useEffect, useState } from "react";
import {
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import usePlacesAutocomplete from "@/hook/usePlaces";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [input, setInput] = useState(initialLocation || "");
  const apiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY; // Ensure this is properly set
  const { suggestions, fetchSuggestions, clearSuggestions } =
    usePlacesAutocomplete(apiKey); // Use the hook

  // Update input when initialLocation changes
  useEffect(() => {
    setInput(initialLocation || "");
  }, [initialLocation]);

  const onInputChange = (text) => {
    setInput(text);
    fetchSuggestions(text); // Fetch suggestions using the hook
  };

  const onSuggestionPress = async (placeId, selectedSuggestion) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
      );
      const details = await response.json();

      if (!details.result) {
        throw new Error("No place details found");
      }

      // Ensure the address is exactly what the user selected
      const fullAddress =
        selectedSuggestion ||
        details.result.formatted_address ||
        details.result.name;

      handlePress({
        latitude: details.result.geometry.location.lat,
        longitude: details.result.geometry.location.lng,
        address: fullAddress,
      });

      setInput(fullAddress); // Update input field
      clearSuggestions(); // Clear suggestions
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <View>
      <TextInput
        value={input}
        onChangeText={onInputChange}
        placeholder={initialLocation ?? "Search places"}
        placeholderTextColor="gray"
        style={{
          borderWidth: 1,
          borderColor: "gray",
          padding: 10,
          borderRadius: 5,
          fontSize: 16,
          fontWeight: "300",
        }}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onSuggestionPress(item.place_id, item.description)}
            >
              <Text
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                }}
              >
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default GoogleTextInput;
