import { View, Text, Pressable, Image } from "react-native";
import { parseISO } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";
import { icons } from "@/constants";

const formatTime = (dateString: string) => {
  const utcDate = parseISO(dateString);

  const timeZone = "Pacific/Auckland";

  const zonedDate = toZonedTime(utcDate, timeZone);

  return format(zonedDate, "HH:mm", { timeZone });
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
