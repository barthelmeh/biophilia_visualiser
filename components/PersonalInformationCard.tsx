import { View, Text, Pressable, Image } from "react-native";

import { icons } from "@/constants";

interface PersonalInformationProps {
  participant: Participant;
  handleNavigateBack: () => void;
}

const PersonalInformationCard = (props: PersonalInformationProps) => {
  return (
    <View className="rounded-xl bg-secondaryContainer p-6 flex justify-center items-center relative w-full">
      {/* Back button */}
      <View className="absolute top-0 left-0 px-4 py-2">
        <Pressable onPress={props.handleNavigateBack}>
          <Image
            source={icons.leftArrow}
            className="h-8 w-8 text-text"
            resizeMode="contain"
          />
        </Pressable>
      </View>

      <View className="flex justify-center items-center py-6">
        <Text className="font-bold text-primary text-3xl font-title">
          {props.participant.firstName + " " + props.participant.lastName}
        </Text>
        <Text className="text-primary font-body">
          {props.participant.activityLevel}
        </Text>
      </View>

      <Text className="font-body text-primary text-sm">
        {props.participant.email}
      </Text>
    </View>
  );
};

export default PersonalInformationCard;
