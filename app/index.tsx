import { Text, View, Pressable, Image, SafeAreaView } from "react-native";
import { Link, router } from "expo-router";

import GetStartedFooter from "@/components/GetStartedFooter";
import CustomButton from "@/components/CustomButton";

import { images } from "../constants";

export default function Index() {

  return (
    <SafeAreaView className="bg-background h-full relative">
      <View className="w-full h-full relative px-4">

        <View className="h-full w-full flex justify-center items-center pb-2">

          {/* Log in button for admins */}

          <View className="absolute top-0 right-0 p-2">
            <Link href="/login" asChild>
              <Pressable>
                <Text className="font-bold font-body text-secondary_text"> Log in </Text>
              </Pressable>
            </Link>
          </View>

          {/* Background Image */}
          <Image 
                source={images.scion_logo}
                className="absolute w-[175%] h-[200%] opacity-25 -z-20"
                resizeMode="contain"
          />
          
          <View className="flex justify-center items-center w-full">
            <Text className="font-bold text-6xl font-text text-text font-title leading-normal">
              Stress Level
            </Text>
            <Text className="font-bold text-6xl font-text text-text font-title leading-normal -mt-8">
              Visualiser
            </Text>
          </View>

          <View className="flex justify-center items-center text-center mb-8">
            <Text className="text-secondary_text text-center font-body leading-normal">
              A tool to visualise {'\n'} psychophysiological responses
            </Text>
          </View>
          
          <View className="flex justify-center items-center my-16">
            <Link href="/terms_and_conditions" asChild>
              <CustomButton 
                title="Get Started →"
                isLoading={false}
                handlePress={() => router.push('/terms_and_conditions')}
                key={"get_started"}
              />

              {/* <Pressable className="rounded-full bg-button py-1 px-4 shadow-sm">
                <Text className="font-bold font-body text-secondary_text">Get Started →</Text>
              </Pressable> */}
            </Link>
            
          </View>

        </View>

        <View className='absolute bottom-0 left-0 right-0'>
          <GetStartedFooter /> 
        </View>

      </View>
    </SafeAreaView>
  );
}
