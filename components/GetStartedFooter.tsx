import {View, Text} from "react-native";
import "../global.css";

const GetStartedFooter = () => {
    return (
        <View className="flex flex-row justify-center items-center gap-2">
            <Text> FORESTS </Text>
            <View className="h-2 w-2 bg-green-500"/>
            <Text> PRODUCTS </Text>
            <View className="h-2 w-2 bg-orange-500" />
            <Text> INNOVATIONS </Text>
        </View>
    )
}

export default GetStartedFooter;