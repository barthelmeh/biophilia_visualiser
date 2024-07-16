import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import "../global.css";

import GlobalProvider from "@/context/GlobalProvider";

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
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
        <Stack.Screen name="terms_and_conditions" options={{ headerShown: false }} />
        <Stack.Screen name="visualiser" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      </Stack>
    </GlobalProvider>
    
  );
}

export default RootLayout;