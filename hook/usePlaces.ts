import { useState } from "react";

const usePlacesAutocomplete = (apiKey) => {
  const [suggestions, setSuggestions] = useState([]);

  console.log("Here are the suggestions:", suggestions);

  const fetchSuggestions = async (input) => {
    console.log(input);
    if (input.length > 2) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`
        );
        const data = await response.json();
        setSuggestions(data.predictions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  return { suggestions, fetchSuggestions };
};

export default usePlacesAutocomplete;
