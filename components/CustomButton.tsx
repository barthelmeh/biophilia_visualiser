import { Pressable, Text, GestureResponderEvent, View } from "react-native";
import { forwardRef } from "react";

interface CustomButtonProps {
  title: string;
  isLoading: boolean;
  disabled?: boolean;
  containerStyles?: string;
  textStyles?: string;
  handlePress?: (event: GestureResponderEvent) => void;
}

const CustomButton = forwardRef<View, CustomButtonProps>(
  (props: CustomButtonProps, ref) => {
    return (
      <Pressable
        className={`flex justify-center items-center shadow-sm py-2 px-4 rounded-lg bg-primary ${
          props.containerStyles
        } ${
          props.isLoading || props.disabled
            ? "opacity-25 cursor-not-allowed"
            : ""
        }`}
        onPress={props.handlePress}
        disabled={props.isLoading || props.disabled}
        ref={ref}
      >
        <Text
          className={`font-body text-white font-bold text-lg ${props.textStyles}`}
        >
          {props.title}
        </Text>
      </Pressable>
    );
  }
);

export default CustomButton;
