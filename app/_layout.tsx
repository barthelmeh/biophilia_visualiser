import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <View style={styles.layoutStyles}>
      <Slot />
    </View>
  );
}
const styles = StyleSheet.create({
  layoutStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});