import { SafeAreaView, View, Pressable, Image, Text } from "react-native";
import { router } from "expo-router";

import { icons, images } from "@/constants";

interface NotFoundProps {
  description: string;
}

const NotFound = (props: NotFoundProps) => (
  <SafeAreaView className="bg-background h-full relative">
    <View className="w-full h-full px-4">
      {/* Back button */}
      <View className="absolute top-0 left-0 px-4 py-2">
        <Pressable onPress={() => router.back()}>
          <Image
            source={icons.leftArrow}
            className="h-8 w-8 text-text"
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* Background Image */}
      <Image
        source={images.scion_logo}
        className="absolute opacity-25 -z-20 -bottom-10"
        resizeMode="contain"
      />

      <View className="h-full w-full justify-center items-center">
        <Text className="text-primary font-bold font-title text-4xl">
          Uh Oh!
        </Text>
        <Text className="text-primary font-body text-lg">
          {props.description}
        </Text>
      </View>
    </View>
  </SafeAreaView>
);

export default NotFound;
