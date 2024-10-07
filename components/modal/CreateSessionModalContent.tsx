import { View, Pressable, Text, Image } from "react-native";
import DismissKeyboard from "../DismissKeyboard";
import { icons } from "@/constants";

interface CreateSessionProps {
  handleClose: () => void;
  handleCreateSession: (form: SessionCreate) => void;
}

const CreateSessionModalContent = (props: CreateSessionProps) => {
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
      </View>
    </DismissKeyboard>
  );
};

export default CreateSessionModalContent;
