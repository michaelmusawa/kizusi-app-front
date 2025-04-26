import React from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";
import { Card } from "@/components/CarCard";
import NoResults from "../NoResults";
import { Car } from "@/lib/definitions";

interface CarsGridProps {
  cars: Car[];
  loading: boolean;
  error: any;
  onCardPress: (id: number) => void;
}

export const CarsGrid: React.FC<CarsGridProps> = ({
  cars,
  loading,
  error,
  onCardPress,
}) => {
  // Loading indicator
  if (loading && !error) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // No results view
  if (!loading && cars.length === 0) {
    return <NoResults />;
  }

  return (
    <ScrollView className="pb-16 px-5" showsVerticalScrollIndicator={false}>
      <View className="flex-row flex-wrap justify-between">
        {cars.map((car) => (
          <View key={car.id} className="w-[48%] mb-5">
            <Card car={car} onPress={() => onCardPress(car.id)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
