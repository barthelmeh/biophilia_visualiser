import { Text, View, SafeAreaView } from 'react-native'

const Dashboard = () => {
  return (
    <SafeAreaView className="bg-background h-full relative">
      <View className="w-full h-full relative px-4">

        <View className="flex justify-center items-center my-16">
          <Text className="font-bold font-title text-3xl text-text">Admin Dashboard</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Dashboard
