import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalProvider';
import getInstance from '@/services/SetAxiosHeaders';
import { apiUrl } from '@/constants';

const Dashboard = () => {

  const { admin } = useContext(GlobalContext);

  const [participants, setParticipants] = React.useState<Array<Participant>>([]);

  React.useEffect(() => {
    const axios = getInstance(admin?.token);

    axios.get(`${apiUrl}/participant`)
      .then((response) => {
        setParticipants(response.data);
      }, (error) => {

      })
  }, [admin]);

  return (
    <SafeAreaView className="bg-background h-full relative">
      <View className="w-full h-full relative px-4">

        <View className="flex justify-center items-center my-16">
          <Text className="font-bold font-title text-3xl text-text">Participants</Text>
        </View>

        <View>
          {
            participants.map((participant) => (
              <Text key={participant.id}>
                {participant.firstName} {participant.lastName}
              </Text>
            ))
          }
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Dashboard
