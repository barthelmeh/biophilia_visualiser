import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const TermsConditions = () => {
    return (
        <SafeAreaView className="bg-primary h-full">

            <View className="w-full h-full flex justify-center items-center">
                
                <View className="absolute top-0">
                    <Text className="text-center font-bold text-3xl text-text">
                        Terms and Conditions
                    </Text>
                </View>

                <Text className="font-bold text-2xl text-secondary_text tracking-wide p-4">
                    Coming soon
                </Text>

                <Link href="/visualiser" asChild>
                    <Pressable>
                        <Text className="font-bold text-center text-blue-400">
                            Continue
                        </Text>
                    </Pressable>
                </Link>
            </View>
        </SafeAreaView>
    )
}

export default TermsConditions;