import { useState } from "react";
import { View, TextInput, Pressable, Image, Text } from "react-native";

import { icons } from "../constants";

interface FormFieldProps<T extends string | number> {
  value: T;
  placeholder: string;
  handleChangeValue: (value: T) => void;
  isPassword: boolean;
  helperText?: string;
  otherStyles?: string;
  autocapitalise?: "words" | "none" | "sentences";
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

const FormField = <T extends string | number>(props: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View className={`${props.otherStyles ?? ""}`}>
      <View
        className={`flex flex-row items-center w-full py-6 px-4 border-2 text-primary bg-secondaryContainer rounded-md ${
          isFocused ? "border-primary" : "border-background"
        }`}
      >
        <TextInput
          className="flex-1 w-full"
          style={[]}
          autoCapitalize={props.autocapitalise ?? "none"}
          value={props.value.toString()}
          placeholder={props.placeholder}
          placeholderTextColor="#5b7b6f"
          onChangeText={(text) => props.handleChangeValue(text as unknown as T)}
          secureTextEntry={props.isPassword && !showPassword}
          keyboardType={props.keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {props.isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </Pressable>
        )}
      </View>

      {props.helperText && (
        <Text className="text-primary text-sm tracking-tight font-body">
          {props.helperText}
        </Text>
      )}
    </View>
  );
};

export default FormField;
