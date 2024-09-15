import React from "react";
import { Text, View, SafeAreaView, Pressable, FlatList } from "react-native";
import { router } from "expo-router";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalProvider";
import getInstance from "@/services/SetAxiosHeaders";
import { LogOut } from "@/services/LogInService";
import { AxiosError } from "axios";
import ParticipantCard from "@/components/ParticipantCard";
import SearchBar from "@/components/SearchBar";

import { apiUrl } from "@/constants";

const Participants = () => {
  const { admin, setAdmin, setParticipant } = useContext(GlobalContext);

  if (!admin) {
    router.navigate({ pathname: "/" });
    return;
  }

  const [participants, setParticipants] = React.useState<Array<Participant>>(
    []
  );
  const [filteredParticipants, setFilteredParticipants] = React.useState<
    Array<Participant>
  >([]);
  const [searchString, setSearchString] = React.useState("");

  const handleSearch = (newValue: string) => {
    if (participants.length == 0) return;

    setSearchString(newValue);

    if (newValue == "") {
      setFilteredParticipants(participants);
      return;
    }

    // Else search and filter participants

    const searchedParticipants = participants.filter((participant) => {
      const fullName =
        `${participant.firstName} ${participant.lastName}`.toLowerCase();
      const email = participant.email.toLowerCase();
      const searchValue = newValue.toLowerCase();

      // Check if the searchValue exists in firstName, lastName, or email
      return (
        participant.firstName.toLowerCase().includes(searchValue) ||
        participant.lastName.toLowerCase().includes(searchValue) ||
        email.includes(searchValue) ||
        fullName.includes(searchValue) // Check full name for combined first and last names
      );
    });

    setFilteredParticipants(searchedParticipants);
  };

  React.useEffect(() => {
    if (!admin) return;

    const axios = getInstance(admin.token);

    axios.get(`${apiUrl}/participant`).then(
      (response) => {
        setParticipants(response.data);
        setFilteredParticipants(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [admin]);

  const handleLogout = () => {
    if (admin == null) {
      router.navigate({ pathname: "/" });
      return;
    }

    LogOut(admin.token, setAdmin, setParticipant).then(
      (_) => {
        // Successfully logged out
        router.navigate({ pathname: "/" });
      },
      (error) => {
        handleLogoutError(error.error as AxiosError);
      }
    );
  };

  const handleLogoutError = (error: AxiosError) => {
    console.log(`Logout error: ${error}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4">
        {/* Logout Button */}
        <View className="absolute top-0 right-0 p-2">
          <Pressable onPress={() => handleLogout()}>
            <Text className="font-bold text-lg text-primary">Log out</Text>
          </Pressable>
        </View>

        {/* Header */}
        <View className="flex justify-center items-center mt-16 mb-4">
          <Text className="font-bold text-3xl text-primary">
            View All Participants
          </Text>
          <Text className="text-primary">
            Click on a participant to view more information
          </Text>
        </View>

        {/* Search Bar */}
        <SearchBar
          containerStyles="mb-4"
          value={searchString}
          onChange={handleSearch}
          placeholder="Search for a participant"
        />

        {/* Num participants found */}
        <View className="mb-1 mt-2">
          <Text>
            <Text className="font-bold text-primary">
              {participants.length}{" "}
            </Text>
            <Text className="text-primary">participants found</Text>
          </Text>
        </View>

        {/* Render each participant */}
        <FlatList
          data={filteredParticipants}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ParticipantCard participant={item} />}
          ItemSeparatorComponent={() => <View className="h-4" />} // Gap between items
          contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Participants;
