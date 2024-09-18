import {
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  View,
  Platform,
} from "react-native";

type PROPS = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

const Modal = ({ isOpen, withInput, children, ...props }: PROPS) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      className="items-center justify-center flex-1 px-3 bg-zinc-900/40"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View className="items-center justify-center flex-1 px-3 bg-zinc-900/40">
      {children}
    </View>
  );

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...props}
    >
      {content}
    </RNModal>
  );
};

export default Modal;
