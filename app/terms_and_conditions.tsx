import { View, Text, TouchableOpacity } from "react-native"
import { Link } from "expo-router";

const TermsConditions = () => {
    return (
        <View className="w-full h-full flex justify-center items-center">
            
            <View className="absolute top-0">
                <Text className="text-center font-bold text-3xl text-text">
                    Terms and Conditions
                </Text>
            </View>

            <Text className="font-bold text-2xl text-secondary_text tracking-wide p-4">
                Coming soon
            </Text>

            <Link href="" asChild>
                <TouchableOpacity className="">
                    <Text className="font-bold text-center text-blue-400">
                        Continue
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default TermsConditions;