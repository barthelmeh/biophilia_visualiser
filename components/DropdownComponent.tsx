import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface DropdownComponentData<T extends string> {
  label: string;
  value: T;
}

interface DropdownComponentProps<T extends string> {
  data: DropdownComponentData<T>[];
  placeholder: string;
  handleChangeValue: (value: T) => void;
}

const DropdownComponent = <T extends string>(
  props: DropdownComponentProps<T>
) => {
  const [expanded, setExpanded] = React.useState(false);
  const [label, setLabel] = React.useState<string | null>(null);

  const [dropdownTop, setDropdownTop] = React.useState(0);
  const [dropdownWidth, setDropdownWidth] = React.useState(0);

  const windowHeight = Dimensions.get("window").height;

  const buttonRef = React.useRef<View>(null);
  const toggleExpanded = React.useCallback(() => {
    calculateDropdownPosition();
    setExpanded(!expanded);
  }, [expanded]);

  const onSelect = React.useCallback((item: DropdownComponentData<T>) => {
    props.handleChangeValue(item.value);
    setLabel(item.label);
    setExpanded(false);
  }, []);

  const calculateDropdownPosition = React.useCallback(() => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const spaceBelow = windowHeight - pageY - height;
      const dropdownHeight = 175; // Height of the dropdown (set a max height)
      if (spaceBelow < dropdownHeight) {
        setDropdownTop(pageY - dropdownHeight);
      } else {
        setDropdownTop(pageY + height);
      }
      setDropdownWidth(width);
    });
  }, [windowHeight]);

  return (
    <View
      ref={buttonRef}
      onLayout={(event) => {
        calculateDropdownPosition();
      }}
    >
      <TouchableOpacity
        className="flex-row justify-between w-[100%] py-6 items-center bg-secondaryContainer px-4 rounded-md"
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text className="text-primary font-body">
          {label || props.placeholder}
        </Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} color="#5B7B6F" />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View className="flex-1">
              <View
                className={`absolute mx-4 px-6 py-2 rounded-md max-h-[175] bg-secondaryContainer`}
                style={{ top: dropdownTop, width: dropdownWidth }}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={props.data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="justify-center py-3"
                      onPress={() => onSelect(item)}
                    >
                      <Text className="text-primary font-body">
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View className="h-[2] rounded-full bg-primary opacity-20" />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      ) : null}
    </View>
  );
};

export default DropdownComponent;
