import { GlobalContext } from "@/context/GlobalProvider";
import { apiUrl } from "@/constants";
import { View, Text, SafeAreaView, FlatList } from "react-native";
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
import IconButton from "@/components/IconButton";

import { icons } from "@/constants";
import { AxiosError } from "axios";

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

  const handeOpenCreateTimeframeModal = () => {
    // Reset the modal
    setIsCreateTimeframeModalOpen(true);
  };

  const handleCreateTimeframe = (form: TimeframeCreate) => {
    const axios = getInstance(admin.token);
    axios.post(`${apiUrl}/timeframe`, form).then(
      (_) => {
        SuccessToast("Successfully created timeframe");
        getSession();
      },
      (error: AxiosError) => {
        if (error.response?.status === 409) {
          ErrorToast("Cannot create a timeframe during another timeframe");
        } else {
          ErrorToast("Unable to create timeframe");
        }
      }
    );

    setIsCreateTimeframeModalOpen(false);
  };

  const handleDeleteTimeframe = () => {
    const axios = getInstance(admin.token);

    axios.delete(`${apiUrl}/timeframe/${selectedTimeframe?.id}`).then(
      (_) => {
        if (session && session.timeframes) {
          const newTimeframes = session.timeframes.filter(
            (timeframe) => timeframe.id !== selectedTimeframe?.id
          );
          setSession({ ...session, timeframes: newTimeframes });
        }
        SuccessToast("Successfully deleted timeframe");
      },
      (_) => {
        ErrorToast("Unable to delete timeframe");
      }
    );

    setSelectedTimeframe(null);
    setIsDeleteModalOpen(false);
  };

  const getSession = () => {
    setIsLoadingSession(true);
    const axios = getInstance(admin.token);

    axios.get(`${apiUrl}/session/${sessionId}`).then(
      (response) => {
        setSession(response.data);
        setIsLoadingSession(false);
      },
      (_) => {
        // TODO: Handle the error
        router.back();
        ErrorToast("Unable to load session");
      }
    );
  };

  React.useEffect(() => {
    getSession();
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
      <View className="w-full h-full px-4 flex-1">
        {/* Participant Information */}
        <View className="flex justify-center items-center mb-6">
          <PersonalInformationCard
            participant={participant}
            handleNavigateBack={() => router.back()}
          />
        </View>

        {/* Seassion Name Header */}
        <View className="flex justify-center items-center mt-2 mb-6 w-full">
          <Text className="font-bold font-title text-4xl leading-normal text-primary">
            {session.name}
          </Text>
          <Text className="font-body text-sm text-primary -mt-2">
            {formatDate(session.start)}
          </Text>
        </View>

        {/* Existing timeframes */}
        <View className="flex flex-row justify-between mt-6 mb-2 w-full">
          <View className="flex justify-start items-start">
            <Text className="font-bold font-title text-start text-4xl leading-normal text-primary">
              Timeframes
            </Text>
            <Text className="font-body text-sm text-start text-primary -mt-4">
              Mark out specific events
            </Text>
          </View>

          <View className="flex justify-center items-center">
            <IconButton
              icon={icons.plusWhite}
              handlePress={handeOpenCreateTimeframeModal}
            />
          </View>
        </View>

        {/* List of existing timeframes */}

        <FlatList
          className="w-full flex-1" // Ensures FlatList takes remaining space
          data={session.timeframes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TimeframeCard timeframe={item} onDelete={handleOpenDeleteModal} />
          )}
          ItemSeparatorComponent={() => <View className="h-4" />}
          contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
        />

        {/* Visualise button */}
        <View className="w-full flex justify-center items-center">
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

      <Modal isOpen={isCreateTimeframeModalOpen} withInput>
        <CreateTimeframeModalContent
          session={session}
          handleClose={() => setIsCreateTimeframeModalOpen(false)}
          handleCreateTimeframe={handleCreateTimeframe}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default Session;
