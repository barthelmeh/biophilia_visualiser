import { SafeAreaView, View, ActivityIndicator } from "react-native";

const LoadingScreen = () => (
  <SafeAreaView className="bg-background h-full relative">
    <View className="w-full h-full justify-center items-center flex px-4">
      <ActivityIndicator animating size="small" color="#5B7B6F" />
    </View>
  </SafeAreaView>
);

export default LoadingScreen;
