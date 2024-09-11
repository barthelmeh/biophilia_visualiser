import { TouchableWithoutFeedback, Keyboard } from "react-native";

interface DismissKeyboardProps {
  children?: React.ReactNode;
}

const DismissKeyboard = (props: DismissKeyboardProps) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {props.children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
