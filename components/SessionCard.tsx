import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

import SessionDatePill from "./SessionDatePill";

interface SessionCardProps {
  session: Session;
}

const formatTime = (dateString: string) => {
  const time = new Date(dateString);
  const hour = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minutes}`;
};

const SessionCard = (props: SessionCardProps) => {
  return (
    <Pressable
      className={`bg-secondaryContainer rounded-3xl relative w-full p-4 flex-row justify-between items-center`}
      onPress={() => router.push(`/session/${props.session.id}`)}
    >
      {/* Date and session name */}
      <View className="flex flex-row justify-start items-center gap-3">
        {/* Date */}
        <SessionDatePill date={props.session.start} />

        <View className="flex justify-start items-start">
          <Text className="text-primary font-body font-bold text-xl">
            {props.session.name}
          </Text>
          <Text className="text-primary text-sm font-body">
            {`${formatTime(props.session.start)} to ${formatTime(
              props.session.end
            )}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SessionCard;
