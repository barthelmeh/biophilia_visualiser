import { Slot, SplashScreen } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "PoppinsRegular": require("../assets/fonts/Poppins-Regular.ttf"),
    "PoppinsBold": require("../assets/fonts/Poppins-Bold.ttf"),
    "PoppinsBoldItalic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
    "PoppinsExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "PoppinsItalic": require("../assets/fonts/Poppins-Italic.ttf"),
    "DancingScriptBold": require("../assets/fonts/DancingScript-Bold.ttf"),
    "DancingScriptRegular": require("../assets/fonts/DancingScript-Regular.ttf"),
    "NunitoSansRegular": require("../assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSansBold": require("../assets/fonts/NunitoSans-Bold.ttf"),
    "NunitoSansBoldItalic": require("../assets/fonts/NunitoSans-BoldItalic.ttf"),
    "NunitoSansItalic": require("../assets/fonts/NunitoSans-Italic.ttf"),
    "NunitoSansLight": require("../assets/fonts/NunitoSans-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if(!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex bg-background items-center justify-center w-full h-full py-10 px-8">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E9FFF3"
  }
});

export default RootLayout;