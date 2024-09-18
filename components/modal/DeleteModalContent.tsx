import { View, Text, Pressable, Image } from "react-native";
import { icons } from "@/constants";

interface DeleteProps {
  title: string;
  entityName: string;
  handleDelete: () => void;
  handleClose: () => void;
}

const DeleteModalContent = (props: DeleteProps) => {
  return (
    <View className="bg-secondaryContainer rounded-md p-6 flex justify-center items-start w-full">
      <Text className="font-title font-bold text-2xl text-start text-primary">
        {props.title}
      </Text>

      <Pressable
        onPress={props.handleClose}
        className="absolute top-0 right-0 p-4"
      >
        <Image source={icons.cross} className="w-5 h-5" resizeMode="contain" />
      </Pressable>

      <Text className="font-body text-start text-primary">
        Are you sure you want to delete {`"${props.entityName}"`}?
      </Text>

      <Text className="font-body text-start text-primary mt-5">
        This action cannot be undone.
      </Text>
      <View className="w-full flex justify-center items-center mt-10">
        <Pressable
          className="px-1 py-2 bg-error w-full rounded-md"
          onPress={props.handleDelete}
        >
          <Text className="text-white text-center font-body text-lg font-bold">
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DeleteModalContent;
