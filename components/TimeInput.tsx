import { TextInput, View, Text, Pressable } from "react-native";
import { toZonedTime, format, fromZonedTime } from "date-fns-tz";
import React from "react";

interface TimeInputProps {
  handleValueChange: (newValue: string) => void;
  date?: Date;
}

const TimeInput = (props: TimeInputProps) => {
  const [error, setError] = React.useState(" ");
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isAM, setIsAM] = React.useState(true);
  const timezone = "Pacific/Auckland";

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const mask = (value: string): string => {
    // replace non-numeric characters
    value = value.replace(/:|[a-zA-Z]/g, "");

    let totalCharactersInValue = value.length;

    if (totalCharactersInValue === 3) {
      return value.substring(0, 1) + ":" + value.substring(1);
    }

    if (totalCharactersInValue === 4) {
      return value.substring(0, 2) + ":" + value.substring(2);
    }

    return value;
  };

  const validate = (value: string): boolean => {
    let regex = new RegExp("^(0?[1-9]|1[012]):[0-5][0-9]$");
    return value.length ? regex.test(value) : true;
  };

  const handleValueChange = (text: string) => {
    const time = mask(text);

    setValue(time);

    if (!validate(time)) {
      setError("Please enter a valid time");
      props.handleValueChange("");
    } else {
      setError(" ");

      if (time.length === 0) {
        return;
      }

      if (props.date) {
        // Convert to NZST
        const dateInTimezone = toZonedTime(props.date, timezone);

        // Create NZST date with the given time string
        const newDateTimeInNZ = createDateTimeFromTimeString(
          time,
          isAM,
          dateInTimezone
        );

        // Convert back to UTC
        const timeInUTC = fromZonedTime(newDateTimeInNZ, timezone);

        props.handleValueChange(timeInUTC.toISOString());
      } else {
        props.handleValueChange(time);
      }
    }
  };

  const handleChangeIsAM = (newValue: boolean) => {
    setIsAM(newValue);

    if (validate(value)) {
      if (props.date) {
        // Convert to NZST
        const dateInTimezone = toZonedTime(props.date, timezone);

        // Create NZST date with the given time string
        const newDateTimeInNZ = createDateTimeFromTimeString(
          value,
          newValue,
          dateInTimezone
        );

        // Convert back to UTC
        const timeInUTC = fromZonedTime(newDateTimeInNZ, timezone);

        props.handleValueChange(timeInUTC.toISOString());
      } else {
        props.handleValueChange(value);
      }
    }
  };

  return (
    <View className="flex justify-start w-full items-start">
      <View className="flex-row items-center justify-between w-full">
        <View
          className={`flex flex-row items-center flex-1 py-6 px-4 border-2 text-primary bg-secondaryContainer rounded-md ${
            isFocused ? "border-primary" : "border-background"
          }`}
        >
          <TextInput
            className="flex-1"
            keyboardType="number-pad"
            style={[]}
            maxLength={5}
            onChangeText={(text: string) => handleValueChange(text)}
            placeholder="08:00"
            placeholderTextColor="#5b7b6f"
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </View>

        <View className="flex-row justify-center items-center ml-2">
          <Pressable
            onPress={() => handleChangeIsAM(true)}
            className={`py-6 px-4 rounded-md ${
              isAM ? "bg-primary" : "bg-secondaryContainer"
            }`}
          >
            <Text
              className={`text-center font-body font-bold ${
                isAM ? "text-white" : "text-primary"
              }`}
            >
              AM
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleChangeIsAM(false)}
            className={`py-6 px-4 rounded-md ${
              isAM ? "bg-secondaryContainer" : "bg-primary"
            }`}
          >
            <Text
              className={`text-center font-body font-bold ${
                isAM ? "text-primary" : "text-white"
              }`}
            >
              PM
            </Text>
          </Pressable>
        </View>
      </View>

      <Text className="text-error text-sm mt-2">{error}</Text>
    </View>
  );
};

/**
 * Convert a time string and a boolean (AM/PM) into a formatted ISO 8601 datetime string
 * based on the date from startTime.
 *
 * @param timeString - Time in the form 'x:xx' or 'xx:xx'
 * @param isAM - Boolean indicating whether the time is AM or PM
 * @param startTime - Date object from which we take the date part in UTC
 * @returns A string in ISO 8601 format: YYYY-MM-DDTHH:mm:ss
 */
function createDateTimeFromTimeString(
  timeString: string,
  isAM: boolean,
  startTime: Date
): string {
  const [hoursString, minutesString] = timeString.split(":");

  let hours = parseInt(hoursString, 10);
  const minutes = parseInt(minutesString, 10);

  if (!isAM && hours < 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }

  const newDate = new Date(startTime);

  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const day = newDate.getDate().toString().padStart(2, "0");
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const seconds = "00";

  // Return the formatted string in ISO format: YYYY-MM-DDTHH:mm:ss+12:00
  return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}:${seconds}`;
}

export default TimeInput;
