import { GlobalContext } from "@/context/GlobalProvider";
import { apiUrl } from "@/constants";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import NotFound from "@/components/NotFound";
import LoadingScreen from "@/components/LoadingScreen";
import getInstance from "@/services/SetAxiosHeaders";

import PersonalInformationCard from "@/components/PersonalInformationCard";

const Session = () => {
  const { sessionId } = useLocalSearchParams();
  const { admin, participant } = React.useContext(GlobalContext);

  if (!admin) {
    router.navigate("");
    return;
  }

  if (!participant) {
    router.navigate("/participants");
    return;
  }

  const [session, setSession] = React.useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = React.useState(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day.toString()} ${month.toString()} ${year.toString()}`;
  };

  React.useEffect(() => {
    const axios = getInstance(admin.token);

    axios.get(`${apiUrl}/session/${sessionId}`).then(
      (response) => {
        setSession(response.data);
        setIsLoadingSession(false);
        console.log("Gotten session information on /session/[sessionId]");
      },
      (error) => {
        // TODO: Handle the error
        setIsLoadingSession(false);
      }
    );
  }, [sessionId]);

  if (isLoadingSession) {
    return <LoadingScreen />;
  }

  if (!session) {
    return (
      <NotFound description="We were unable to get the session information" />
    );
  }

  return (
    <SafeAreaView className="bg-background h-full flex-1">
      <ScrollView>
        <View className="w-full h-full px-4 flex-1">
          {/* Participant Information */}
          <View className="flex justify-center items-center mb-6">
            <PersonalInformationCard
              participant={participant}
              handleNavigateBack={() => router.back()}
            />
          </View>

          {/* Timeframes Header */}
          <View className="flex justify-start items-start mt-8 mb-2 w-full">
            <Text className="font-bold font-title text-4xl leading-normal text-primary">
              {session.name}
            </Text>
            <Text className="font-body text-sm text-primary -mt-2">
              {formatDate(session.start)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Session;
