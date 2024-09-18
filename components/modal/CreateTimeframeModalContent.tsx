import { View, Text } from "react-native";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import React from "react";

interface CreateTimeframeProps {
  sessionId: number;
  handleClose: () => void;
  handleCreateTimeframe: (form: TimeframeCreate) => void;
}

const CreateTimeframeModalContent = (props: CreateTimeframeProps) => {
  const [timeframeForm, setTimeframeForm] = React.useState<TimeframeCreate>({
    sessionId: props.sessionId,
    description: "",
    startTime: "",
    endTime: "",
  });

  const [startTimeError, setStartTimeError] = React.useState(" ");
  const [endTimeError, setEndTimeError] = React.useState(" ");
  const [descriptionError, setDescriptionError] = React.useState(" ");

  const [isLoading, setIsLoading] = React.useState(false);

  const handleCreatePressed = () => {
    // Check for input errors

    setIsLoading(true);
    props.handleCreateTimeframe(timeframeForm);
  };

  return (
    <View className="bg-secondaryContainer rounded-md p-6 flex justify-center items-start w-full">
      <View className="flex justify-center items-center w-full">
        <View className="flex justify-start items-start w-full mt-6 mb-2">
          <Text className="text-primary font-title font-bold ">
            Create a new timeframe
          </Text>
        </View>

        <View className="flex flex-row justify-between gap-2 w-full">
          <View className="flex-1 justify-center">
            {/* Start Time */}
            <Text className="text-primary font-body text-lg py-1">
              Start time
            </Text>
            <FormField<string>
              value={timeframeForm.startTime}
              placeholder={"HH:MM"}
              handleChangeValue={(e) =>
                setTimeframeForm({ ...timeframeForm, startTime: e })
              }
              isPassword={false}
            />
            <Text className="text-error text-sm">{startTimeError}</Text>
          </View>

          <View className="flex-1 justify-center">
            {/* End Time */}
            <Text className="text-primary font-body text-lg py-1">
              End time
            </Text>
            <FormField<string>
              value={timeframeForm.endTime}
              placeholder={"HH:MM"}
              handleChangeValue={(e) =>
                setTimeframeForm({ ...timeframeForm, endTime: e })
              }
              isPassword={false}
            />
            <Text className="text-error text-sm">{endTimeError}</Text>
          </View>
        </View>

        <View className="flex justify-center w-full">
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
          <Text className="text-error mb-4 text-sm">{descriptionError}</Text>
        </View>
      </View>

      <CustomButton
        title={"Create a new Timeframe"}
        isLoading={isLoading}
        handlePress={handleCreatePressed}
      />
    </View>
  );
};

export default CreateTimeframeModalContent;
