import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaView>
      <View className="flex bg-background w-full h-full py-10 px-8">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  layoutStyles: {
    flex: 1,
    alignItems: "center"
  }
});