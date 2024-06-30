import { Text, View, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import GetStartedFooter from "@/components/GetStartedFooter";

import { images } from "../constants";

export default function Index() {
  return (
    <View className="w-full h-full">

      <View className="h-full w-full flex justify-center items-center pb-2">

        {/* Log in button for admins */}

        <View className="absolute top-0 right-0">
          <Link href="" asChild>
            <TouchableOpacity>
              <Text className="font-bold">
                Log in
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Image 
            source={images.scion_logo}
            className="w-[175%] h-[200%] absolute opacity-25 object-cover"
            resizeMode="contain"
        />
        
        <View className="flex justify-center items-center w-full">
          <Text className="font-bold text-6xl font-text text-text">
            Stress Level
          </Text>
          <Text className="font-bold text-6xl font-text text-text">
            Visualiser
          </Text>
        </View>

        <View className="flex justify-center items-center text-center mb-8">
          <Text className="text-secondary_text text-center tracking-wider">
            A tool to visualise {'\n'} psychophysiological responses
          </Text>
        </View>
        
        <View className="flex justify-center items-center my-16">
          <Link href="/terms_and_conditions" asChild>
            <TouchableOpacity className="rounded-full bg-button py-1 px-4">
              <Text className="font-bold">Get Started →</Text>
            </TouchableOpacity>
          </Link>
          
        </View>

      </View>

      <GetStartedFooter /> 

    </View>
  );
}
