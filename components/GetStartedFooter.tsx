import {View, Text} from "react-native";

const GetStartedFooter = () => {
    return (
        <View className="flex justify-center items-center flex-row gap-2 absolute bottom-0 left-0 right-0">
            <Text>
            FORESTS
            </Text>
            <View className="h-2 w-2 bg-green-500"/>
            <Text>
            PRODUCTS
            </Text>
            <View className="h-2 w-2 bg-orange-500" />
            <Text>
            INNOVATIONS
            </Text>
        </View>
    )
}

export default GetStartedFooter;