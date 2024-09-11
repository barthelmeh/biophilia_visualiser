import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { GlobalContext } from "@/context/GlobalProvider";
import { useContext } from "react";

interface ParticipantCardProps {
  participant: Participant;
}

const ParticipantCard = (props: ParticipantCardProps) => {
  const { setParticipant } = useContext(GlobalContext);

  const handleCardPressed = () => {
    setParticipant(props.participant);
    router.push(`/participant`);
  };

  return (
    <Pressable
      className={`bg-secondaryContainer rounded-3xl relative w-full p-4 flex-row items-center`}
      onPress={handleCardPressed}
    >
      {/* Profile Picture Placeholder with Initials */}
      <View className="bg-primary w-12 h-12 rounded-full justify-center items-center mr-3">
        <Text className="text-white font-body font-bold text-lg">
          {props.participant.firstName[0] + props.participant.lastName[0]}
        </Text>
      </View>

      {/* Participant Info: Name and Email */}
      <View className="flex-1">
        <Text className="text-primary font-body font-bold text-lg">
          {props.participant.firstName + " " + props.participant.lastName}
        </Text>
        <Text className="text-primary font-body text-sm">
          {props.participant.email}
        </Text>
      </View>
    </Pressable>
  );
};

export default ParticipantCard;
