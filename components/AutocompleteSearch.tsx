import { icons } from "@/constants";
import { Car } from "@/lib/definitions";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const AutocompleteSearch = ({
  cars,
  searchTerm,
  setReturnCars,
}: {
  cars: Car[];
  searchTerm: string;
  setReturnCars: (cars: Car[]) => void;
}) => {
  const [query, setQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = (text: string) => {
    setQuery(text);

    if (text.length > 0) {
      const filtered = cars.filter(
        (car) =>
          car.name.toLowerCase().includes(text.toLowerCase()) ||
          car.category.toLowerCase().includes(text.toLowerCase()) ||
          (car.name.toLowerCase().includes(text.toLowerCase()) &&
            car.category.toLowerCase().includes(text.toLowerCase()))
      );
      if (searchTerm !== "") {
        setReturnCars(filtered);
        return;
      } else {
        setFilteredCars(filtered);
      }
    } else {
      setFilteredCars([]);
    }
  };

  const handleSelectCar = (selectedCar: Car) => {
    setQuery(`${selectedCar.name} ${selectedCar.category}`);
    setReturnCars([selectedCar]);
    setFilteredCars([]);
  };

  const handleClear = () => {
    setQuery("");
    setFilteredCars([]);
    setReturnCars([]);
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="flex-row items-center justify-between h-12 border border-gray-300 rounded-2xl px-4 bg-white">
        <TextInput
          className=""
          placeholder="Search for a car..."
          value={query}
          onChangeText={handleSearch}
        />
        {query !== "" && (
          <TouchableOpacity onPress={handleClear} className="ml-2">
            <Image
              source={icons.close}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {query !== "" && searchTerm === "" && (
        <FlatList
          data={filteredCars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="py-3 px-4 border-b border-gray-300"
              onPress={() => handleSelectCar(item)}
            >
              <Text className="text-lg text-gray-800">
                {item.name}, {item.category}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              No cars found
            </Text>
          }
        />
      )}
    </View>
  );
};

export default AutocompleteSearch;
