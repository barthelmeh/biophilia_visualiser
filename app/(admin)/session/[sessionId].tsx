import { GlobalContext } from "@/context/GlobalProvider";
import { apiUrl } from "@/constants";
import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import NotFound from "@/components/NotFound";
import LoadingScreen from "@/components/LoadingScreen";
import getInstance from "@/services/SetAxiosHeaders";

import PersonalInformationCard from "@/components/PersonalInformationCard";
import TimeframeCard from "@/components/TimeframeCard";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

const Session = () => {
  const { sessionId } = useLocalSearchParams();
  const { admin, participant } = React.useContext(GlobalContext);

  if (!admin) {
    router.navigate({ pathname: "/" });
    return;
  }

  if (!participant) {
    router.navigate("/participants");
    return;
  }

  const [session, setSession] = React.useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = React.useState(true);

  const [timeframeForm, setTimeframeForm] = React.useState<TimeframeCreate>({
    sessionId: session?.id ?? -1,
    description: "",
    startTime: "",
    endTime: "",
  });

  const [startTimeError, setStartTimeError] = React.useState(" ");
  const [endTimeError, setEndTimeError] = React.useState(" ");
  const [descriptionError, setDescriptionError] = React.useState(" ");
  const [submissionError, setSubmissionError] = React.useState(" ");

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
        console.log(response.data);
        setIsLoadingSession(false);
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

          {/* Seassion Name Header */}
          <View className="flex justify-start items-start mt-8 mb-2 w-full">
            <Text className="font-bold font-title text-4xl leading-normal text-primary">
              {session.name}
            </Text>
            <Text className="font-body text-sm text-primary -mt-2">
              {formatDate(session.start)}
            </Text>
          </View>

          {/* Add a timeframe */}
          <View className="flex justify-center items-center w-full">
            <View className="flex justify-start items-start w-full mt-6 mb-2">
              <Text className="text-primary font-title font-bold ">
                Create a new timeframe
              </Text>
            </View>

            <View className="flex flex-row justify-between gap-2 w-full">
              <View className="flex-1 justify-center">
                {/* Start Time */}
                <Text className="text-primary font-body text-lg py-1">
                  Start time
                </Text>
                <FormField<string>
                  value={timeframeForm.startTime}
                  placeholder={"HH:MM"}
                  handleChangeValue={(e) =>
                    setTimeframeForm({ ...timeframeForm, startTime: e })
                  }
                  isPassword={false}
                />
                <Text className="text-error text-sm">{startTimeError}</Text>
              </View>

              <View className="flex-1 justify-center">
                {/* End Time */}
                <Text className="text-primary font-body text-lg py-1">
                  End time
                </Text>
                <FormField<string>
                  value={timeframeForm.endTime}
                  placeholder={"HH:MM"}
                  handleChangeValue={(e) =>
                    setTimeframeForm({ ...timeframeForm, endTime: e })
                  }
                  isPassword={false}
                />
                <Text className="text-error text-sm">{endTimeError}</Text>
              </View>
            </View>

            <View className="flex justify-center w-full">
              {/* Description */}
              <Text className="text-primary font-body text-lg py-1">
                Description
              </Text>
              <FormField<string>
                value={timeframeForm.description}
                placeholder={"Enter the description"}
                handleChangeValue={(e) =>
                  setTimeframeForm({ ...timeframeForm, description: e })
                }
                isPassword={false}
                autocapitalise="sentences"
              />
              <Text className="text-error mb-4 text-sm">
                {descriptionError}
              </Text>
            </View>
          </View>

          <CustomButton title={"Create a new Timeframe"} isLoading={false} />

          {/* Existing timeframes */}
          <View className="flex justify-start items-start w-full mt-6 mb-2">
            <Text className="text-primary font-title font-bold ">
              Existing Timeframes
            </Text>
          </View>

          {/* List of existing timeframes */}
          <View className="flex-1 w-full justify-center items-center space-y-2">
            {session.timeframes?.map((timeframe) => (
              <TimeframeCard key={timeframe.id} timeframe={timeframe} />
            ))}
          </View>

          {/* <FlatList
            data={session.timeframes ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TimeframeCard timeframe={item} />}
            ItemSeparatorComponent={() => <View className="h-4" />} // Gap between items
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Session;
