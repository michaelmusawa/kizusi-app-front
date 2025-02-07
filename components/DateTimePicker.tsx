import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, View, Text } from "react-native";
import { useLocationStore } from "@/store";

export const DateTimePickerComponent = () => {
  const { date, setDate } = useLocationStore();

  const [localDate, setLocalDate] = useState(new Date());
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
        <Button onPress={showDatepicker} title="Date" />
        <Button onPress={showTimepicker} title="Time" />
      </View>

      <Text className="mt-2">{localDate.toLocaleString()}</Text>
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
