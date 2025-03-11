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
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useLocationStore } from "@/store";
import * as Location from "expo-location";
import { Card, CategoryCard } from "@/components/CarCard";
import { useFetch } from "@/lib/fetch";
import { Car, Category, User } from "@/lib/definitions";
import { icons } from "@/constants";
import { useDebouncedCallback } from "use-debounce";

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  // Get user location logic

  const { setUserLocation } = useLocationStore();

  const [fetchLimit, setFetchLimit] = useState("6");
  const [seeAll, setSeeAll] = useState(true);

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
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
  }, [setUserLocation]);

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // Fetch categories data
  const {
    data: categoriesResponse,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch<{ data: { categories: Category[] } }>("/(api)/category", {
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

    setUrl(fetchUrl);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.filter, params.query, fetchLimit]);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  });

  const handleCardPress = (id: number) => router.push(`/${id}/car-details`);
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

  let brandNames: string[] = [];

  if (categories) {
    brandNames = [
      ...new Set(
        categories.flatMap(
          (category) =>
            // eslint-disable-next-line prettier/prettier
            category.brands.map((brand) => brand.brandName)
          // eslint-disable-next-line prettier/prettier
        )
      ),
    ];
  }

  const {
    data: response,
    loading: userLoading,
    error: userError,
  } = useFetch<{ data: User | null }>(`/(api)/user/${user?.id ?? ""}`, {
    method: "GET",
  });

  const returnedUser = response?.data ?? null;

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={cars}
        numColumns={2}
        renderItem={({ item }) => (
          <Card car={item} onPress={() => handleCardPress(item.id)} />
        )}
        keyExtractor={(item) => `${item.id}`}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          carsLoading && !carsError ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row justify-between w-full">
                <View className="flex flex-row">
                  <TouchableOpacity
                    onPress={
                      user
                        ? handleSignOut
                        : () => router.push("/(auth)/sign-in")
                    }
                  >
                    <View className="rounded-full size-10 items-center justify-center border border-secondary-100">
                      {userLoading && !userError ? (
                        <Text className="text-xs">Loading..</Text>
                      ) : (
                        <View>
                          <Image
                            source={
                              user
                                ? {
                                    uri:
                                      returnedUser?.image ??
                                      user?.externalAccounts?.[0]?.imageUrl ??
                                      user?.imageUrl,
                                  }
                                : icons.login
                            }
                            className={
                              user
                                ? "size-8 rounded-full"
                                : "size-5 rounded-full"
                            }
                          />
                        </View>
                      )}
                    </View>

                    <Text className="text-xs mt-1 font-rubik text-secondary-100 text-center">
                      {user ? "Logout" : "Login"}
                    </Text>
                  </TouchableOpacity>

                  <View className="flex flex-col items-start ml-2 justify-center">
                    <Text className="text-xs font-rubik text-black-100">
                      {new Date().getHours() < 12
                        ? "Good Morning,"
                        : "Good Evening,"}
                    </Text>
                    <Text className="text-base font-rubik-medium text-black-300">
                      {user
                        ? (returnedUser?.name ?? user?.fullName)
                        : "Welcome"}
                    </Text>
                  </View>
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

                {categoriesLoading && !categoriesError ? (
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

            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Available cars
                </Text>
                <TouchableOpacity onPress={handleSeeAll}>
                  <Text className="text-base font-rubik-bold text-secondary-100">
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
