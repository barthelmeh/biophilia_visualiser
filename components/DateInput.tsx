import { View, Text, TextInput } from "react-native";
import React from "react";

interface DateInputProps {
  value: Date;
  handleChangeValue: (newValue: Date) => void;
  setError: (error: string) => void;
}

const DateInput = (props: DateInputProps) => {
  const [day, setDay] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");

  const dayInput = React.useRef<TextInput>(null);
  const monthInput = React.useRef<TextInput>(null);
  const yearInput = React.useRef<TextInput>(null);

  const handleDayChange = (newDay: string) => {
    setDay(newDay);
    if (newDay.length == 2) {
      dayInput.current?.blur();
      monthInput.current?.focus();
      setFocused(1);
    }
    updateValue();
  };

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    if (newMonth.length == 2) {
      monthInput.current?.blur();
      yearInput.current?.focus();
      setFocused(2);
    }
    updateValue();
  };

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    if (newYear.length == 4) {
      yearInput.current?.blur();
      setFocused(-1);
    }
    updateValue();
  };

  const updateValue = () => {
    if (day.length == 2 && month.length == 2 && year.length == 4) {
      const date = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10)
      );

      props.handleChangeValue(date);
    }
  };

  const [focused, setFocused] = React.useState(-1);

  return (
    <View className="flex flex-row">
      {/* Day input */}
      <View
        className={`w-1/4 items-center py-6 px-4 text-primary bg-secondaryContainer rounded-md border-2 ${
          focused == 0 ? "border-primary" : "border-background"
        }`}
      >
        <TextInput
          ref={dayInput}
          className="flex-1"
          autoCapitalize="none"
          value={day}
          onChangeText={(day) => handleDayChange(day)}
          keyboardType="number-pad"
          placeholder="DD"
          maxLength={2}
          onFocus={() => setFocused(0)}
          onBlur={() => setFocused(-1)}
          blurOnSubmit={false}
        />
      </View>
      {/* Month input */}
      <View
        className={`w-1/4 items-center py-6 px-4 text-primary bg-secondaryContainer rounded-md border-2 ${
          focused == 1 ? "border-primary" : "border-background"
        }`}
      >
        <TextInput
          ref={monthInput}
          className="flex-1"
          autoCapitalize="none"
          value={month}
          onChangeText={(month) => handleMonthChange(month)}
          keyboardType="number-pad"
          placeholder="MM"
          maxLength={2}
          onFocus={() => setFocused(1)}
          onBlur={() => setFocused(-1)}
          blurOnSubmit={false}
        />
      </View>
      {/* Year input */}
      <View
        className={`w-1/2 items-center py-6 px-4 text-primary bg-secondaryContainer rounded-md border-2 ${
          focused == 2 ? "border-primary" : "border-background"
        }`}
      >
        <TextInput
          ref={yearInput}
          className="flex-1"
          autoCapitalize="none"
          value={year}
          onChangeText={(year) => handleYearChange(year)}
          keyboardType="number-pad"
          placeholder="YYYY"
          maxLength={4}
          onFocus={() => setFocused(2)}
          onBlur={() => setFocused(-1)}
          blurOnSubmit={false}
        />
      </View>
    </View>
  );
};

export default DateInput;
