// import React, { useEffect, useState } from "react";
// import { View, TouchableOpacity, Image, TextInput, Text } from "react-native";
// import { useDebouncedCallback } from "use-debounce";
// import { icons } from "@/constants";
// import { useLocalSearchParams, router, usePathname } from "expo-router";
// import { Car } from "@/lib/definitions";

// const Search = ({ cars }: { cars: Car[] }) => {
//   const path = usePathname();
//   const params = useLocalSearchParams<{ query?: string }>();
//   const [search, setSearch] = useState(params.query);

//   const [query, setQuery] = useState("");
//   const [filteredCars, setFilteredCars] = useState<Car[]>([]);

//   const debouncedSearch = useDebouncedCallback((text: string) => {
//     router.setParams({ query: text });
//   });

//   useEffect(() => {
//     handleSearch(search || "");
//   }, [search]);

//   const handleSearch = (text: string) => {
//     setSearch(text);
//     setQuery(text);

//     if (text.length > 0) {
//       const filtered = cars.filter(
//         (car) =>
//           car.name.toLowerCase().includes(text.toLowerCase()) ||
//           car.category.categoryName
//             .toLowerCase()
//             .includes(text.toLowerCase()) ||
//           // eslint-disable-next-line prettier/prettier
//           car.brand.brandName.toLowerCase().includes(text.toLowerCase())
//       );
//       if (search !== "") {
//         return;
//       } else {
//         setFilteredCars(filtered);
//       }
//     } else {
//       setFilteredCars([]);
//     }
//   };

//   const handleSelectCar = (selectedCar: Car) => {
//     const newQuery = `${selectedCar.name} ${selectedCar.category.categoryName}`;
//     const useQuery = `${selectedCar.name}`;
//     setQuery(`${selectedCar.name} ${selectedCar.category.categoryName}`);
//     setSearch(useQuery);
//     debouncedSearch(useQuery);
//     setFilteredCars([]);
//   };

//   const handleClear = () => {
//     setQuery("");
//     setSearch(query);
//     debouncedSearch("");
//     setFilteredCars([]);
//   };

//   return (
//     <>
//       <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-gray-100 mt-5 py-2">
//         <View className="flex-1 flex flex-row items-center justify-start z-50">
//           <Image source={icons.search} className="size-5" />
//           <TextInput
//             value={query}
//             onChangeText={handleSearch}
//             placeholder="Search for car"
//             className="text-sm font-rubik text-black-300 ml-2 flex-1"
//           />
//         </View>

//         {query !== "" && (
//           <TouchableOpacity onPress={handleClear}>
//             <Image source={icons.close} className="size-5" />
//           </TouchableOpacity>
//         )}
//       </View>

//       <View className="rounded-lg">
//         {query !== "" && search !== ""
//           ? filteredCars.length > 0
//             ? filteredCars.map((item, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   className="py-3 px-4 border-b border-gray-100"
//                   onPress={() => handleSelectCar(item)}
//                 >
//                   <Text className="text-sm font-rubik text-black-300 ml-2 flex-1">
//                     {item.name}, {item.category.categoryName}
//                   </Text>
//                 </TouchableOpacity>
//               ))
//             : !params.query && (
//                 <Text className="text-center text-gray-500 mt-4">
//                   No cars found
//                 </Text>
//               )
//           : null}
//       </View>
//     </>
//   );
// };

// export default Search;

import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
} from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { icons } from "@/constants";
import { useLocalSearchParams, router } from "expo-router";
import { Car } from "@/lib/definitions";

interface SearchProps {
  cars: Car[];
}

const Search: React.FC<SearchProps> = ({ cars }) => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState<string>(params.query || "");
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  // Debounced router update
  const debouncedSetParams = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 300);

  // Filter cars whenever query changes
  useEffect(() => {
    const text = query.trim();
    if (text) {
      const lower = text.toLowerCase();
      setFilteredCars(
        cars.filter(
          (car) =>
            car.name.toLowerCase().includes(lower) ||
            car.category.categoryName.toLowerCase().includes(lower) ||
            // eslint-disable-next-line prettier/prettier
            car.brand.brandName.toLowerCase().includes(lower)
          // eslint-disable-next-line prettier/prettier
        )
      );
      debouncedSetParams(text);
    } else {
      setFilteredCars([]);
      // debouncedSetParams("");
    }
  }, [query, cars, debouncedSetParams]);

  const handleSelect = (car: Car) => {
    // const label = `${car.name} ${car.category.categoryName}`;
    setQuery(car.name);
    setFilteredCars([]);
    router.push(`/${car.id}/car-details`);
    Keyboard.dismiss();
  };

  const clearSearch = () => {
    setQuery("");
    setFilteredCars([]);
    debouncedSetParams("");
    Keyboard.dismiss();
  };

  return (
    <View>
      <View className="mt-5 mx-4 p-4 bg-gray-50 rounded-lg shadow-md">
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
          <Image source={icons.search} className="w-5 h-5" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search for car"
            className="ml-2 flex-1 text-sm font-rubik text-black-300"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} className="ml-2">
              <Image source={icons.close} className="w-5 h-5" />
            </TouchableOpacity>
          )}
        </View>

        {query.length > 0 && (
          <ScrollView
            className="bg-white rounded-lg mt-2 max-h-60"
            keyboardShouldPersistTaps="handled"
          >
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <TouchableOpacity
                  key={car.id}
                  onPress={() => handleSelect(car)}
                  className="px-3 py-2 border-b border-gray-100"
                >
                  <Text className="text-sm font-rubik text-black-300">
                    {car.name}, {car.category.categoryName}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View className="py-4">
                <Text className="text-center text-gray-500">No cars found</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Search;
