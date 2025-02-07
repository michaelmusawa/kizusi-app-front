import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Search from "@/components/Search";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { useUser } from "@clerk/clerk-expo";
import { useLocationStore } from "@/store";
import * as Location from "expo-location";
import { Card, CategoryCard } from "@/components/CarCard";
import { useFetch } from "@/lib/fetch";
import { Car, Category } from "@/lib/definitions";
import { icons } from "@/constants";
import { useDebouncedCallback } from "use-debounce";

const Home = () => {
  const userDetails = {
    avatar: null,
    // "https://images.unsplash.com/photo-1606814893907-c2e42943c91f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    name: null,
  };

  // Get user location logic

  const { setUserLocation } = useLocationStore();
  const { user } = useUser();

  const [hasPermissions, setHasPermissions] = useState(false);
  const [fetchLimit, setFetchLimit] = useState("6");
  const [seeAll, setSeeAll] = useState(true);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    requestLocation();
  }, []);

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // Fetch categories data
  const {
    data: categoriesResponse,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch<{ data: Category[] }>("/(api)/category", {
    method: "GET",
  });

  const categories = categoriesResponse?.data?.categories || [];

  // Build query parameters string
  const queryParams = new URLSearchParams({
    filter: params.filter || "",
    query: params.query || "",
    limit: "",
  }).toString();

  // Fetch cars data with query parameters
  const {
    data: carsResponse,
    loading: carsLoading,
    error: carsError,
    refetch,
    setUrl,
  } = useFetch<{ data: Car[] }>(`/(api)/car?${queryParams}`, {
    method: "GET",
  });

  const cars = carsResponse?.data || [];

  // Refetch data with updated parameters when filter or query changes
  useEffect(() => {
    const fetchUrl = `/(api)/car?${new URLSearchParams({
      filter: params.filter || "",
      query: params.query || "",
      limit: fetchLimit,
    }).toString()}`;

    setUrl(fetchUrl); // Update the URL state
    refetch(); // Refetch with the updated URL
  }, [params.filter, params.query, fetchLimit]);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  });

  const handleCardPress = (id: string) => router.push(`/${id}/car-details`);
  const handleCategoryPress = (name: string) => {
    debouncedSearch(name);
  };

  const handleSeeAll = () => {
    setSeeAll(!seeAll);
    if (seeAll) {
      setFetchLimit("");
    } else {
      setFetchLimit("6");
    }
  };

  let brandNames;

  if (categories) {
    brandNames = [
      ...new Set(
        categories.flatMap((category) =>
          category.brands.map((brand) => brand.brandName)
        )
      ),
    ];
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={cars}
        numColumns={2}
        renderItem={({ item }) => (
          <Card car={item} onPress={() => handleCardPress(item.id)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          carsLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <View className="rounded-full size-10 items-center justify-center border border-primary-600">
                  <Image
                    source={
                      userDetails?.avatar
                        ? { uri: userDetails.avatar }
                        : icons.person
                    }
                    className="size-8 rounded-full"
                  />
                </View>

                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {userDetails?.name ?? "there"}
                  </Text>
                </View>
              </View>
            </View>

            <Search cars={cars} />

            {!params.query && fetchLimit === "6" && (
              <View className="my-5">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-rubik-bold text-black-300">
                    Categories
                  </Text>
                </View>

                {categoriesLoading ? (
                  <ActivityIndicator
                    size="large"
                    className="text-primary-300"
                  />
                ) : !categories || categories.length === 0 ? (
                  <NoResults />
                ) : (
                  <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                      <CategoryCard
                        category={item}
                        onPress={() => handleCategoryPress(item.name)}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex gap-5 mt-5"
                  />
                )}
              </View>
            )}

            {/* <Button title="seed" onPress={seed} /> */}

            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Available cars
                </Text>
                <TouchableOpacity onPress={handleSeeAll}>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    {seeAll ? "See all" : "See less"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Filters brands={brandNames} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { fetchAPI, useFetch } from "@/lib/fetch";

// type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// const App = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");

//   const {
//     data: ourUsers,
//     loading,
//     error,
//     refetch,
//   } = useFetch<User[]>("/(api)/user", {
//     method: "GET",
//   });

//   useEffect(() => {
//     if (ourUsers) {
//       setUsers(ourUsers);
//     }
//   }, [ourUsers]);

//   const handleAddUser = async () => {
//     if (!name.trim() || !email.trim()) {
//       return alert("Please provide both name and email");
//     }
//     try {
//       await fetchAPI("/(api)/user", {
//         method: "POST",
//         body: JSON.stringify({ name, email }),
//       });
//       setName("");
//       setEmail("");
//       refetch();
//     } catch (error) {
//       console.error("Failed to add user:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>User List:</Text>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <Text style={styles.listItem}>{`${item.name} - ${item.email}`}</Text>
//         )}
//         contentContainerStyle={styles.listContainer}
//       />

//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         keyboardType="email-address"
//       />
//       <Button title="Add User" onPress={handleAddUser} />
//     </View>
//   );
// };
