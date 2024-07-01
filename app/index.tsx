import { Text, View, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import GetStartedFooter from "@/components/GetStartedFooter";

import { images } from "../constants";

export default function Index() {

  return (
    <View className="w-full h-full relative">

      <View className="h-full w-full flex justify-center items-center pb-2">

        {/* Log in button for admins */}

        <View className="absolute top-0 right-0">
          <Link href="" asChild>
            <Pressable>
              <Text className="font-bold font-body">
                Log in
              </Text>
            </Pressable>
          </Link>
        </View>

        <Image 
            source={images.scion_logo}
            className="w-[175%] h-[200%] absolute opacity-25 object-cover"
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
            <Pressable className="rounded-full bg-button py-1 px-4">
              <Text className="font-bold font-body">Get Started →</Text>
            </Pressable>
          </Link>
          
        </View>

      </View>

      <View className='absolute bottom-0 left-0 right-0'>
        <GetStartedFooter /> 
      </View>

    </View>
  );
}
