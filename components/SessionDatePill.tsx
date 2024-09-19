import { View, Text } from "react-native";
import React from "react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return [day.toString(), month.toString(), year.toString()];
};

interface SessionDatePillProps {
  date: string;
}

const SessionDatePill = (props: SessionDatePillProps) => {
  const [dayString, setDayString] = React.useState("");
  const [monthString, setMonthString] = React.useState("");
  const [yearString, setYearString] = React.useState("");

  React.useEffect(() => {
    const [day, month, year] = formatDate(props.date);

    setDayString(day);
    setMonthString(month);
    setYearString(year);
  }, [props.date]);

  return (
    <View className="bg-primary rounded-2xl py-1 px-3">
      <Text className="text-white font-body font-bold text-center">
        {dayString + " " + monthString}
      </Text>
      <Text className="text-white font-body text-xs text-center">
        {yearString}
      </Text>
    </View>
  );
};

export default SessionDatePill;
