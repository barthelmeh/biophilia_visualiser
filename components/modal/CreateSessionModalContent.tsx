import { View, Pressable, Text, Image } from "react-native";
import { useState } from "react";
import DismissKeyboard from "../DismissKeyboard";
import { icons } from "@/constants";
import FormField from "../FormField";
import TimeInput from "../TimeInput";
import CustomButton from "../CustomButton";
import { ErrorToast } from "../ToastComponents";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import DateInput from "../DateInput";

interface CreateSessionProps {
  participant: Participant;
  handleClose: () => void;
  handleCreateSession: (form: SessionCreate, jsonContent: string) => void;
}

const CreateSessionModalContent = (props: CreateSessionProps) => {
  const [sessionForm, setSessionForm] = useState<SessionCreate>({
    participantId: props.participant.id,
    name: "",
    startTime: "",
    endTime: "",
    data: [],
  });

  const [loadingFile, setLoadingFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonContent, setJsonContent] = useState("");
  const [date, setDate] = useState(new Date());

  const [nameError, setNameError] = useState(" ");
  const [error, setError] = useState(" ");

  const handleStartTimeChange = (startTime: string) => {
    if (sessionForm.endTime.length > 0) {
      const endDate = new Date(sessionForm.endTime);
      const startDate = new Date(startTime);
      if (endDate <= startDate) {
        setError("The end time must be after the start time");
      } else {
        setError(" ");
      }
    }

    setSessionForm({ ...sessionForm, startTime });
  };

  const handleEndTimeChange = (endTime: string) => {
    if (sessionForm.startTime.length > 0) {
      const endDate = new Date(endTime);
      const startDate = new Date(sessionForm.startTime);
      if (endDate <= startDate) {
        setError("The end time must be after the start time");
      } else {
        setError(" ");
      }
    }

    setSessionForm({ ...sessionForm, endTime });
  };

  const selectFile = async () => {
    setLoadingFile(true);
    try {
      // Open the document picker to select a JSON file
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json", // Specify MIME type for JSON
      });

      if (!result.canceled) {
        // Read the file content using FileSystem API
        const fileContent = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.UTF8,
          }
        );

        // Store JSON content to display or process it before uploading
        setJsonContent(fileContent);
      } else {
        ErrorToast("File selection canceled");
      }
    } catch (err) {
      ErrorToast("Unable to upload file");
    }
    setLoadingFile(false);
  };

  const handleCreatePressed = () => {
    // Check for input errors
    if (sessionForm.name.length === 0) {
      setNameError("Please supply a name");
      return;
    }

    setNameError(" ");

    if (sessionForm.endTime.length === 0) {
      setError("Please supply an ending time");
      return;
    }

    setError(" ");

    if (sessionForm.startTime.length === 0) {
      setError("Please supply a starting time");
      return;
    }

    const endDate = new Date(sessionForm.endTime);
    const startDate = new Date(sessionForm.startTime);
    if (endDate <= startDate) {
      setError("The end time must be after the start time");
      return;
    }

    setError(" ");

    if (!jsonContent) {
      setError("Please supply a JSON file in the correct format");
      return;
    }

    setError(" ");

    setIsLoading(true);

    props.handleCreateSession(sessionForm, jsonContent);
  };

  return (
    <DismissKeyboard>
      <View className="bg-background rounded-md p-6 flex justify-center items-start w-full">
        <Pressable
          onPress={props.handleClose}
          className="absolute top-0 right-0 p-4"
        >
          <Image
            source={icons.cross}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </Pressable>

        <Text className="font-title font-bold text-2xl text-start text-primary">
          Create a New Session
        </Text>
        <Text className="font-body text-start text-primary">
          A session is a collection of data
        </Text>

        <View className="w-full justify-center items-start">
          <View className="flex justify-center w-full mt-2">
            {/* Name */}
            <Text className="text-primary font-body text-lg py-1">Name</Text>
            <FormField<string>
              value={sessionForm.name}
              placeholder={"Enter the session name"}
              handleChangeValue={(e) =>
                setSessionForm({ ...sessionForm, name: e })
              }
              isPassword={false}
              autocapitalise="sentences"
            />
            <Text className="text-error text-sm">{nameError}</Text>
          </View>

          <View className="flex justify-center w-full">
            {/* Start Time */}
            <Text className="text-primary font-body text-lg py-1">
              Start time
            </Text>
            <TimeInput
              handleValueChange={(e) => handleStartTimeChange(e)}
              date={date}
            />
          </View>

          <View className="flex justify-center w-full">
            {/* End Time */}
            <Text className="text-primary font-body text-lg py-1">
              End time
            </Text>
            <TimeInput
              handleValueChange={(e) => handleEndTimeChange(e)}
              date={date}
            />
          </View>

          <Text className="text-error text-start text-sm">{error}</Text>

          {/* File input */}
          <View className="flex justify-center w-full">
            <CustomButton
              title="Select JSON File"
              isLoading={loadingFile}
              handlePress={selectFile}
            />
          </View>
        </View>

        <View className="w-full mt-4">
          <CustomButton
            title={"Create a new Session"}
            isLoading={isLoading}
            handlePress={handleCreatePressed}
          />
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default CreateSessionModalContent;
