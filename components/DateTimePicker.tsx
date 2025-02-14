import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { useLocationStore } from "@/store";

export const DateTimePickerComponent = () => {
  const { date, setDate } = useLocationStore();

  const [localDate, setLocalDate] = useState(date ?? new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setLocalDate(currentDate);
    setDate({ date: currentDate });
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg mb-2">Select date & time:</Text>
      <View className="flex flex-row gap-2">
        <TouchableOpacity
          onPress={showDatepicker}
          className="p-2 border border-gray-300 rounded-lg bg-gray-50"
        >
          {localDate ? (
            <Text>{localDate.toLocaleDateString()}</Text>
          ) : (
            <Text>Date</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showTimepicker}
          className="p-2 border border-gray-300 rounded-lg bg-gray-50"
        >
          {localDate ? (
            <Text>{localDate.toLocaleTimeString()}</Text>
          ) : (
            <Text>Time</Text>
          )}
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={localDate}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};
