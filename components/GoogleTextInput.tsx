import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
      />
    </View>
  );
};

export default GoogleTextInput;

// import React, { useState } from "react";
// import {
//   TextInput,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import usePlacesAutocomplete from "@/hook/usePlaces";

// const GoogleTextInput = ({ handlePress }) => {
//   const [input, setInput] = useState("");
//   const apiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY; // Ensure this is properly set
//   const { suggestions, fetchSuggestions } = usePlacesAutocomplete(apiKey); // Use the hook

//   const onInputChange = (text) => {
//     setInput(text);
//     fetchSuggestions(text); // Fetch suggestions using the hook
//   };

//   const onSuggestionPress = async (placeId) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
//       );
//       const details = await response.json();
//       handlePress({
//         latitude: details.result.geometry.location.lat,
//         longitude: details.result.geometry.location.lng,
//         address: details.result.formatted_address,
//       });
//     } catch (error) {
//       console.error("Error fetching place details:", error);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         value={input}
//         onChangeText={onInputChange}
//         placeholder="Search places"
//         style={{
//           borderWidth: 1,
//           borderColor: "gray",
//           padding: 10,
//           borderRadius: 5,
//         }}
//       />
//       <FlatList
//         data={suggestions}
//         keyExtractor={(item) => item.place_id}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => onSuggestionPress(item.place_id)}>
//             <Text
//               style={{
//                 padding: 10,
//                 borderBottomWidth: 1,
//                 borderBottomColor: "gray",
//               }}
//             >
//               {item.description}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// export default GoogleTextInput;
