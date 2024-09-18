import { GlobalContext } from "@/context/GlobalProvider";
import { apiUrl } from "@/constants";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import React from "react";
import NotFound from "@/components/NotFound";
import getInstance from "@/services/SetAxiosHeaders";

import PersonalInformationCard from "@/components/PersonalInformationCard";
import TimeframeCard from "@/components/TimeframeCard";
import CustomButton from "@/components/CustomButton";
import { ErrorToast, SuccessToast } from "@/components/ToastComponents";
import Modal from "@/components/modal/Modal";
import DeleteModalContent from "@/components/modal/DeleteModalContent";
import LoadingScreen from "@/components/LoadingScreen";
import CreateTimeframeModalContent from "@/components/modal/CreateTimeframeModalContent";

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

  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<Timeframe | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isCreateTimeframeModalOpen, setIsCreateTimeframeModalOpen] =
    React.useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day.toString()} ${month.toString()} ${year.toString()}`;
  };

  const handleOpenDeleteModal = (timeframe: Timeframe) => {
    setSelectedTimeframe(timeframe);
    setIsDeleteModalOpen(true);
  };

  const handleCreateTimeframe = (form: TimeframeCreate) => {};

  const handleDeleteTimeframe = () => {
    // TODO: Delete the timeframe
    setSelectedTimeframe(null);
    setIsDeleteModalOpen(false);
    SuccessToast("Successfully deleted timeframe");

    if (session && session.timeframes) {
      const newTimeframes = session.timeframes.filter(
        (timeframe) => timeframe.id !== selectedTimeframe?.id
      );
      setSession({ ...session, timeframes: newTimeframes });
    }
  };

  React.useEffect(() => {
    const axios = getInstance(admin.token);

    axios.get(`${apiUrl}/session/${sessionId}`).then(
      (response) => {
        setSession(response.data);
        setIsLoadingSession(false);
      },
      (error) => {
        // TODO: Handle the error
        router.back();
        ErrorToast("Unable to load session");
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

          {/* Existing timeframes */}
          <View className="flex justify-start items-start w-full mt-6 mb-2">
            <Text className="text-primary font-title font-bold ">
              Existing Timeframes
            </Text>
            <Text className="text-primary text-small italic font-body">
              Click on a timeframe for more options
            </Text>
          </View>

          {/* List of existing timeframes */}
          <View className="flex-1 w-full justify-center items-center gap-2 pb-10">
            {session.timeframes?.map((timeframe) => (
              <TimeframeCard
                key={timeframe.id}
                timeframe={timeframe}
                onDelete={handleOpenDeleteModal}
              />
            ))}
          </View>

          {/* Visualise button */}
          <View className="w-full flex justify-center items-center py-12">
            <CustomButton
              containerStyles="w-full"
              title="Visualise session"
              isLoading={false}
            />
          </View>
        </View>

        <Modal isOpen={isDeleteModalOpen}>
          <DeleteModalContent
            title={"Delete Timeframe"}
            handleClose={() => setIsDeleteModalOpen(false)}
            entityName={selectedTimeframe?.description ?? ""}
            handleDelete={handleDeleteTimeframe}
          />
        </Modal>

        <Modal isOpen={isCreateTimeframeModalOpen}>
          <CreateTimeframeModalContent
            sessionId={session?.id ?? -1}
            handleClose={() => setIsDeleteModalOpen(false)}
            handleCreateTimeframe={handleCreateTimeframe}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Session;
