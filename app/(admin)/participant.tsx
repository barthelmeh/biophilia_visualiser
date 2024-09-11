import { SafeAreaView, View, Text, FlatList } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import { GlobalContext } from "@/context/GlobalProvider";

import { apiUrl } from "@/constants";
import PersonalInformationCard from "@/components/PersonalInformationCard";
import SessionCard from "@/components/SessionCard";
import NotFound from "@/components/NotFound";
import getInstance from "@/services/SetAxiosHeaders";
import CustomButton from "@/components/CustomButton";
import LoadingScreen from "@/components/LoadingScreen";

const Participant = () => {
  const { admin, participant, setParticipant } =
    React.useContext(GlobalContext);

  if (!admin) {
    router.navigate("");
    return;
  }

  if (!participant) {
    router.navigate("/participants");
    return;
  }

  const [isLoadingSessions, setIsLoadingSessions] = React.useState(true);
  const [sessions, setSessions] = React.useState<Session[]>([]);

  const handleNavigateBack = () => {
    setParticipant(null);
    router.back();
  };

  const handleCreateNewSession = () => {};

  React.useEffect(() => {
    if (!participant) return;

    const axios = getInstance(admin.token);

    axios.get(`${apiUrl}/session`).then(
      (response) => {
        setIsLoadingSessions(false);
        // TODO: Filter sessions so that its just your sessions that show
        setSessions(response.data);
        console.log("Gotten all sessions on /participant");
      },
      (error) => {
        setIsLoadingSessions(false);
        // TODO: Handle error
      }
    );
  }, [participant]);

  return (
    <SafeAreaView className="bg-background h-full flex-1">
      <View className="w-full h-full px-4 flex-1">
        {/* Participant Information */}
        <View className="flex justify-center items-center mb-6">
          <PersonalInformationCard
            participant={participant}
            handleNavigateBack={handleNavigateBack}
          />
        </View>

        {/* Sessions Header */}
        <View className="flex justify-start items-start mt-8 mb-2 w-full">
          <Text className="font-bold font-title text-5xl leading-normal text-primary">
            Sessions
          </Text>
          <Text className="font-body text-sm text-primary -mt-4">
            Click on a session to see more options
          </Text>
        </View>

        {/* FlatList */}
        <FlatList
          className="w-full flex-1" // Ensures FlatList takes remaining space
          data={sessions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SessionCard session={item} />}
          ItemSeparatorComponent={() => <View className="h-4" />} // Gap between items
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }} // Adds padding to avoid overlap
        />

        {/* Button placed at the bottom */}
        <View className="w-full py-4 bg-background">
          <CustomButton
            title="Create a new Session"
            isLoading={false}
            handlePress={handleCreateNewSession}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Participant;
