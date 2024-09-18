import { View, Text, Pressable, Image } from "react-native";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import React from "react";

import { icons } from "@/constants";
import TimeInput from "../TimeInput";

interface CreateTimeframeProps {
  session: Session;
  handleClose: () => void;
  handleCreateTimeframe: (form: TimeframeCreate) => void;
}

const CreateTimeframeModalContent = (props: CreateTimeframeProps) => {
  const [timeframeForm, setTimeframeForm] = React.useState<TimeframeCreate>({
    sessionId: props.session.id,
    description: "",
    startTime: "",
    endTime: "",
  });

  const [descriptionError, setDescriptionError] = React.useState(" ");
  const [error, setError] = React.useState(" ");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleStartTimeChange = (startTime: string) => {
    if (timeframeForm.endTime.length > 0) {
      const endDate = new Date(timeframeForm.endTime);
      const startDate = new Date(startTime);
      if (endDate <= startDate) {
        setError("The end time must be after the start time");
      } else {
        setError(" ");
      }
    }

    setTimeframeForm({ ...timeframeForm, startTime });
  };

  const handleEndTimeChange = (endTime: string) => {
    if (timeframeForm.startTime.length > 0) {
      const endDate = new Date(endTime);
      const startDate = new Date(timeframeForm.startTime);
      if (endDate <= startDate) {
        setError("The end time must be after the start time");
      } else {
        setError(" ");
      }
    }

    setTimeframeForm({ ...timeframeForm, endTime });
  };

  const handleCreatePressed = () => {
    // Check for input errors
    if (timeframeForm.description.length === 0) {
      setDescriptionError("Please supply a description");
      return;
    }

    setDescriptionError(" ");

    if (timeframeForm.endTime.length === 0) {
      setError("Please supply an ending time");
      return;
    }

    setError(" ");

    if (timeframeForm.startTime.length === 0) {
      setError("Please supply a starting time");
      return;
    }

    const endDate = new Date(timeframeForm.endTime);
    const startDate = new Date(timeframeForm.startTime);
    if (endDate <= startDate) {
      setError("The end time must be after the start time");
      return;
    }

    setError(" ");

    setIsLoading(true);

    props.handleCreateTimeframe(timeframeForm);
  };

  return (
    <View className="bg-background rounded-md p-6 flex justify-center items-start w-full">
      <Pressable
        onPress={props.handleClose}
        className="absolute top-0 right-0 p-4"
      >
        <Image source={icons.cross} className="w-5 h-5" resizeMode="contain" />
      </Pressable>

      <Text className="font-title font-bold text-2xl text-start text-primary">
        Create a New Timeframe
      </Text>
      <Text className="font-body text-start text-primary">
        Timeframes appear in playback
      </Text>

      <View className="w-full justify-center items-center">
        <View className="flex justify-center w-full mt-2">
          {/* Description */}
          <Text className="text-primary font-body text-lg py-1">
            Description
          </Text>
          <FormField<string>
            value={timeframeForm.description}
            placeholder={"Enter the description"}
            handleChangeValue={(e) =>
              setTimeframeForm({ ...timeframeForm, description: e })
            }
            isPassword={false}
            autocapitalise="sentences"
          />
          <Text className="text-error text-sm">{descriptionError}</Text>
        </View>

        <View className="flex justify-center w-full">
          {/* Start Time */}
          <Text className="text-primary font-body text-lg py-1">
            Start time
          </Text>
          <TimeInput
            handleValueChange={(e) => handleStartTimeChange(e)}
            date={new Date(props.session.start)}
          />
        </View>

        <View className="flex justify-center w-full">
          {/* End Time */}
          <Text className="text-primary font-body text-lg py-1">End time</Text>
          <TimeInput
            handleValueChange={(e) => handleEndTimeChange(e)}
            date={new Date(props.session.start)}
          />
        </View>
      </View>

      <Text className="text-error text-start text-sm">{error}</Text>

      <View className="w-full mt-4">
        <CustomButton
          title={"Create a new Timeframe"}
          isLoading={isLoading}
          handlePress={handleCreatePressed}
        />
      </View>
    </View>
  );
};

export default CreateTimeframeModalContent;
