import { View, Text } from "react-native";

const formatTime = (dateString: string) => {
  const time = new Date(dateString);
  const hour = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minutes}`;
};

interface TimeframeCardProps {
  timeframe: Timeframe;
}

const TimeframeCard = (props: TimeframeCardProps) => {
  return (
    <View className="bg-secondaryContainer rounded-3xl relative w-full p-4 flex-row justify-between items-center">
      <View className="flex-1 w-[20%] items-start justify-center flex">
        <Text className="text-wrap">{props.timeframe.description}</Text>
      </View>
      <View className="flex justify-end items-center">
        <Text className="text-primary font-body font-bold text-2xl">
          {formatTime(props.timeframe.startTime) +
            "-" +
            formatTime(props.timeframe.endTime)}
        </Text>
      </View>
    </View>
  );
};

export default TimeframeCard;
