import { View, TextInput } from "react-native";
import React from "react";

interface SearchBarProps {
  value: string;
  placeholder: string;
  onChange: (newValue: string) => void;
  containerStyles?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View
      className={`flex flex-row items-center w-full py-3 px-4 border-2 text-primary bg-secondaryContainer rounded-lg ${
        isFocused ? "border-primary" : "border-background"
      } ${props.containerStyles}`}
    >
      <TextInput
        autoCapitalize="none"
        value={props.value.toString()}
        placeholder={props.placeholder}
        placeholderTextColor="#5b7b6f"
        onChangeText={(text) => props.onChange(text)}
        keyboardType="default"
      />
    </View>
  );
};

export default SearchBar;
