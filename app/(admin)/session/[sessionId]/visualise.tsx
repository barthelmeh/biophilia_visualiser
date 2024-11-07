import { useState, useEffect, useContext } from "react";
import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import { GlobalContext } from "@/context/GlobalProvider";
import { useLocalSearchParams, router } from "expo-router";

import useGenerator from "@/hooks/useGenerator";
import hrvTranslation from "@/utility/hrvTranslation";
import { stressLevel } from "@/constants";
import Blob from "@/components/Blob/Blob";
import getInstance from "@/services/SetAxiosHeaders";
import { apiUrl } from "@/constants";
import LoadingScreen from "@/components/LoadingScreen";

import { Canvas } from "@react-three/fiber/";
import { ErrorToast, SuccessToast } from "@/components/ToastComponents";
import { icons } from "@/constants";

const Visualiser = () => {
  const { sessionId } = useLocalSearchParams();
  const { participant, admin } = useContext(GlobalContext);
  const [stress, setStress] = useState<stressLevel>(stressLevel.CALM);

  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [currentTimeframe, setCurrentTimeframe] = useState(" ");

  const HRVData = useGenerator(session?.data ?? []);

  if (!participant) {
    ErrorToast("Could not find selected participant");
    router.navigate("/participants");
    return;
  }

  if (!admin) {
    ErrorToast("Sorry, you can't do that!");
    router.navigate("/");
    return;
  }

  useEffect(() => {
    const axios = getInstance(admin.token);

    axios.get(`${apiUrl}/session/${sessionId}`).then(
      (response) => {
        setIsLoadingSession(false);
        const newSession = response.data;
        setSession(newSession);
      },
      (error) => {
        setIsLoadingSession(false);
        ErrorToast("Error loading session");
        router.navigate("/participants");
      }
    );
  }, [sessionId]);

  useEffect(() => {
    if (!HRVData || !participant) {
      return;
    }

    if (HRVData.id == null) {
      // End of the data
      router.back();
      SuccessToast("Finished visualisation");
    }

    setStress(hrvTranslation(HRVData, participant));
  }, [HRVData]);

  useEffect(() => {
    if (HRVData && session && session.timeframes) {
      // Find the current timeframe where HRVData.time is between start and end
      const matchingFrame = session.timeframes.find((frame) => {
        const startTime = new Date(frame.startTime);
        const endTime = new Date(frame.endTime);
        const hrvTime = new Date(HRVData.time);
        return hrvTime >= startTime && hrvTime <= endTime;
      });

      setCurrentTimeframe(matchingFrame?.description ?? " ");
    }
  }, [HRVData, session?.timeframes]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day.toString()} ${month.toString()} ${year.toString()}`;
  };

  const formatTime = (datetimeString: string): string => {
    // Create a new Date object from the datetime string
    const date = new Date(datetimeString);

    // Get hours, minutes, and seconds, padding with zeroes if necessary
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    // Print the time in HH:MM:SS format
    return `${hours}:${minutes}:${seconds}`;
  };

  if (isLoadingSession || !session) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView className="bg-background h-full relative">
      <View className="relative h-full w-full">
        {/* Back button */}
        <View className="absolute top-0 left-0 px-4 py-2">
          <Pressable onPress={() => router.back()}>
            <Image
              source={icons.leftArrow}
              className="h-8 w-8 text-text"
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* Title */}
        <View className="flex justify-center items-center mt-16">
          <Text className="font-bold font-title text-4xl leading-normal text-primary">
            Visualiser
          </Text>
          <Text className="font-body text-primary">
            {formatDate(session.start)}
          </Text>
        </View>

        <View className="flex justify-center items-center mb-12">
          <Text className="font-body text-primary">
            {formatTime(HRVData?.time ?? "")}
          </Text>
        </View>

        {/* Timeframe text */}
        <View className="flex justify-center items-center">
          <Text className="font-primary font-light text-2xl text-primary">
            {currentTimeframe}
          </Text>
        </View>

        <Canvas>
          <Blob stressLevel={stress} />
        </Canvas>
      </View>
    </SafeAreaView>
  );
};

export default Visualiser;
