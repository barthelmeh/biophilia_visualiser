import { View, Text, Pressable, Image } from "react-native";

import { icons } from "@/constants";

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
  const handleDeleteTimeframe = () => {};

  return (
    <View className="bg-secondaryContainer rounded-3xl w-full p-4 flex justify-center items-center relative">
      {/* Text */}
      <View className="flex w-full items-start justify-center">
        <Text className="text-primary font-body font-bold text-2xl">
          {formatTime(props.timeframe.startTime) +
            " to " +
            formatTime(props.timeframe.endTime)}
        </Text>
        <Text className="text-primary font-body line-clamp-2">
          {props.timeframe.description}
        </Text>
      </View>
      {/* Delete button */}
      <View className="absolute top-1/2 right-0 pe-5">
        <Pressable onPress={handleDeleteTimeframe}>
          <Image
            source={icons.trashIcon}
            className="h-8 w-8 text-text"
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TimeframeCard;
