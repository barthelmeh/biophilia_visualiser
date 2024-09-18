import { Pressable, Image } from "react-native";

interface IconButtonProps {
  handlePress: () => void;
  icon: number;
}

const IconButton = (props: IconButtonProps) => {
  return (
    <Pressable
      className="rounded-full bg-primary p-2"
      onPress={props.handlePress}
    >
      <Image
        source={props.icon}
        className="h-6 w-6 text-text"
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default IconButton;
