import { useState } from "react";

const usePlacesAutocomplete = (apiKey) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (input) => {
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
      setSuggestions([]);
    }
  };

  const clearSuggestions = () => {
    setSuggestions([]); // Clear suggestions
  };

  return { suggestions, fetchSuggestions, clearSuggestions };
};

export default usePlacesAutocomplete;
