import { View, SafeAreaView, Text, Image } from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

import { images } from "../constants";

const AllDone = () => (
  <SafeAreaView className="bg-background h-full relative">
    <View className="flex-1 justify-between px-4 py-10">
      {/* Centered Text */}
      <View className="flex-1 justify-center items-center">
        <Text className="font-bold font-title text-3xl text-primary text-center">
          You're all good to go!
        </Text>
        <Text className="font-body text-center text-primary mt-2">
          Please hand the application back to the study supervisor
        </Text>
      </View>

      {/* Background Image */}
      <Image
        source={images.scion_logo}
        className="absolute opacity-25 -z-20 -bottom-10"
        resizeMode="contain"
      />

      {/* Finish Button */}
      <View className="pb-10">
        <CustomButton
          title="Finish"
          containerStyles="w-full"
          handlePress={() => router.navigate("/")}
          isLoading={false}
        />
      </View>
    </View>
  </SafeAreaView>
);

export default AllDone;
