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
  onDelete: (timeframe: Timeframe) => void;
}

const TimeframeCard = (props: TimeframeCardProps) => {
  return (
    <View className="bg-secondaryContainer rounded-3xl w-full p-4 flex justify-center items-center relative">
      {/* Text */}
      <View className="flex w-full items-start justify-center">
        <Text className="text-primary font-body font-bold line-clamp-2 text-lg">
          {props.timeframe.description}
        </Text>
        <Text className="text-primary font-body">
          {formatTime(props.timeframe.startTime) +
            " to " +
            formatTime(props.timeframe.endTime)}
        </Text>
      </View>
      {/* Delete button */}
      <View className="absolute top-1/2 right-0 pe-5">
        <Pressable onPress={() => props.onDelete(props.timeframe)}>
          <Image
            source={icons.trashIcon}
            className="h-6 w-6 text-text"
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TimeframeCard;
