import {
  Text,
  View,
  Pressable,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Link, router } from "expo-router";

import GetStartedFooter from "@/components/GetStartedFooter";
import CustomButton from "@/components/CustomButton";

import { images } from "../constants";

export default function Index() {
  return (
    <SafeAreaView className="bg-background h-full relative">
      <StatusBar barStyle={"dark-content"} />
      <View className="w-full h-full relative px-4">
        <View className="h-full w-full flex justify-center items-center pb-2">
          {/* Log in button for admins */}
          <View className="absolute top-0 right-0 p-2">
            <Link href="/login" asChild>
              <Pressable>
                <Text className="font-bold font-body text-lg text-primary">
                  Log in
                </Text>
              </Pressable>
            </Link>
          </View>

          {/* Background Image */}
          <Image
            source={images.scion_logo}
            className="absolute opacity-25 -z-20 -bottom-10"
            resizeMode="contain"
          />

          <View className="flex justify-center items-center w-full">
            <Text className="font-bold text-7xl font-text text-primary font-title leading-normal">
              Biophilia
            </Text>
            <Text className="font-bold text-4xl font-text text-primary font-title leading-normal -mt-4 mb-4">
              Visualiser
            </Text>
          </View>

          <View className="flex justify-center items-center text-center mb-8">
            <Text className="text-primary text-center font-body leading-normal">
              A tool to visualise {"\n"} psychophysiological responses
            </Text>
          </View>

          <View className="flex justify-center items-center my-16">
            <Link href="/terms_and_conditions" asChild>
              <CustomButton
                title="Get Started →"
                isLoading={false}
                handlePress={() => router.push("/details")}
                key={"get_started"}
              />
            </Link>
          </View>
        </View>

        <View className="absolute bottom-0 left-0 right-0">
          <GetStartedFooter />
        </View>
      </View>
    </SafeAreaView>
  );
}
