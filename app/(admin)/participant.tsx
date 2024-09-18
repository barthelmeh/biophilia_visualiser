import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import React from "react";
import { GlobalContext } from "@/context/GlobalProvider";
import Modal from "@/components/modal/Modal";
import DeleteModalContent from "@/components/modal/DeleteModalContent";
import { apiUrl } from "@/constants";
import PersonalInformationCard from "@/components/PersonalInformationCard";
import SessionCard from "@/components/SessionCard";
import getInstance from "@/services/SetAxiosHeaders";
import CustomButton from "@/components/CustomButton";
import { ErrorToast, SuccessToast } from "@/components/ToastComponents";
import IconButton from "@/components/IconButton";

import { icons } from "@/constants";

const Participant = () => {
  const { admin, participant, setParticipant } =
    React.useContext(GlobalContext);

  if (!admin) {
    router.navigate({ pathname: "/" });
    return;
  }

  if (!participant) {
    router.navigate("/participants");
    return;
  }

  const [isLoadingSessions, setIsLoadingSessions] = React.useState(true);
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = React.useState<Session | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const handleNavigateBack = () => {
    setParticipant(null);
    router.back();
  };

  const handleCreateSession = () => {};

  const handleOpenCreateSessionModal = () => {};

  const handleOpenDeleteModal = (session: Session) => {
    setSelectedSession(session);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSession = () => {
    // TODO: Delete the session
    setSelectedSession(null);
    setIsDeleteModalOpen(false);
    SuccessToast("Successfully deleted session");

    const newSessions = sessions.filter(
      (session: Session) => session.id !== selectedSession?.id
    );
    setSessions(newSessions);
  };

  React.useEffect(() => {
    if (!participant) return;

    const axios = getInstance(admin.token);

    axios.get(`${apiUrl}/session`).then(
      (response) => {
        setIsLoadingSessions(false);
        // TODO: Filter sessions so that its just your sessions that show
        const allSessions = response.data;
        const personalSessions = allSessions.filter(
          (session: Session) => session.participantId == participant.id
        );
        setSessions(personalSessions);
      },
      (error) => {
        setIsLoadingSessions(false);
        ErrorToast("Error loading sessions");
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
        <View className="flex flex-row justify-between mt-8 mb-2 w-full">
          <View className="flex justify-start items-start">
            <Text className="font-bold font-title text-start text-4xl leading-normal text-primary">
              Sessions
            </Text>
            <Text className="font-body text-sm text-start text-primary -mt-4">
              Click on a session to see more options
            </Text>
          </View>

          <View className="flex justify-center items-center">
            <IconButton
              icon={icons.plusWhite}
              handlePress={handleOpenCreateSessionModal}
            />
          </View>
        </View>

        {/* FlatList */}
        {isLoadingSessions ? (
          <View className="flex justify-center items-center w-full flex-1">
            <ActivityIndicator animating={true} />
          </View>
        ) : (
          <FlatList
            className="w-full flex-1" // Ensures FlatList takes remaining space
            data={sessions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SessionCard session={item} onDelete={handleOpenDeleteModal} />
            )}
            ItemSeparatorComponent={() => <View className="h-4" />} // Gap between items
            contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }} // Adds padding to avoid overlap
          />
        )}

        <Modal isOpen={isDeleteModalOpen}>
          <DeleteModalContent
            title={"Delete Session"}
            handleClose={() => setIsDeleteModalOpen(false)}
            entityName={selectedSession?.name ?? ""}
            handleDelete={handleDeleteSession}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Participant;
