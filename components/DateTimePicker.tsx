import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, TouchableOpacity } from "react-native";
import { useLocationStore } from "@/store";

export const DateTimePickerComponent = ({
  bookType,
}: {
  bookType: string | null;
}) => {
  const { date, endDate, setDate, setEndDate } = useLocationStore();

  const [localDate, setLocalDate] = useState(date ?? new Date());
  const [localEndDate, setLocalEndDate] = useState(endDate ?? new Date());

  // Separate state to show/hide each DateTimePicker and set their mode.
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);
  const [startMode, setStartMode] = useState<"date" | "time">("date");
  const [endMode, setEndMode] = useState<"date" | "time">("date");

  // For start date/time
  const onChangeStart = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || localDate;
    setStartPickerVisible(false);
    setLocalDate(currentDate);
    setDate({ date: currentDate });
  };

  // For end date/time
  const onChangeEnd = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || localEndDate;
    setEndPickerVisible(false);
    setLocalEndDate(currentDate);
    setEndDate({ endDate: currentDate });
  };

  const showStartPicker = (mode: "date" | "time") => {
    setStartPickerVisible(true);
    setStartMode(mode);
  };

  const showEndPicker = (mode: "date" | "time") => {
    setEndPickerVisible(true);
    setEndMode(mode);
  };

  return (
    <View className="flex-1 justify-center items-center">
      {bookType === "full_day" ? (
        <Text className="text-lg mb-2">Select start & end date:</Text>
      ) : (
        <Text className="text-lg mb-2">Select date & time:</Text>
      )}

      {bookType === "full_day" ? (
        <View className="flex flex-col gap-1 justify-center items-center">
          {/* Start date and time */}
          <View className="flex flex-row gap-2">
            {date ? (
              <>
                <TouchableOpacity
                  onPress={() => showStartPicker("date")}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <Text>{date ? date.toLocaleDateString() : "Start Date"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => showStartPicker("time")}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <Text>{date ? date.toLocaleTimeString() : "Start Time"}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => showStartPicker("date")}
                className="p-2 border border-gray-300 rounded-lg bg-gray-50"
              >
                <Text>Select start date</Text>
              </TouchableOpacity>
            )}
          </View>

          <View>
            <Text className="text-xs">to</Text>
          </View>

          {/* End date and time */}
          <View className="flex flex-row gap-2">
            {endDate ? (
              <>
                <TouchableOpacity
                  onPress={() => showEndPicker("date")}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <Text>
                    {localEndDate
                      ? localEndDate.toLocaleDateString()
                      : "End Date"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => showEndPicker("time")}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <Text>
                    {localEndDate
                      ? localEndDate.toLocaleTimeString()
                      : "End Time"}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => showEndPicker("date")}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <Text>Select end date</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ) : (
        // Single date and time for non-full bookings.
        <View className="flex flex-row gap-2">
          {date ? (
            <>
              <TouchableOpacity
                onPress={() => showStartPicker("date")}
                className="p-2 border border-gray-300 rounded-lg bg-gray-50"
              >
                <Text>{date ? date.toLocaleDateString() : "Start Date"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showStartPicker("time")}
                className="p-2 border border-gray-300 rounded-lg bg-gray-50"
              >
                <Text>{date ? date.toLocaleTimeString() : "Start Time"}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => showStartPicker("date")}
              className="p-2 border border-gray-300 rounded-lg bg-gray-50"
            >
              <Text>Select start date</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Render the DateTimePickers conditionally */}
      {startPickerVisible && (
        <DateTimePicker
          testID="startDateTimePicker"
          value={localDate}
          mode={startMode}
          is24Hour={true}
          onChange={onChangeStart}
          minimumDate={new Date()}
        />
      )}
      {endPickerVisible && (
        <DateTimePicker
          testID="endDateTimePicker"
          value={localEndDate}
          mode={endMode}
          is24Hour={true}
          onChange={onChangeEnd}
          minimumDate={new Date(localDate)}
        />
      )}
    </View>
  );
};
