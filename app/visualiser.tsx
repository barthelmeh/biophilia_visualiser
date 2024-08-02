import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { Link } from 'expo-router';

import useGenerator from '@/hooks/useGenerator';
import hrvTranslation from '@/utility/hrvTranslation';
import { activityLevel, gender, stressLevel } from '@/constants';

// For now, import data for the generator from a .json
// Should be linked up to the database
import hrv_data from '../assets/hrv_data.json';

// Replace with datetime from database
let today = new Date(); 
const date = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();

const Visualiser = () => {

    const [biophiliaLevel, setBiophiliaLevel] = useState(' ');
    const [biophiliaColour, setBiophiliaColour] = useState('');

    const HRVData = useGenerator(hrv_data);
    // Update these with Global Context
    const participant: Participant = {
        id: 0,
        firstName: "Tom",
        lastName: "Barthelmeh",
        email: "test@test.com",
        age: 20,
        gender: gender.MALE,
        activityLevel: activityLevel.MODERATELYACTIVE,
        hasAcceptedTerms: true
    }

    useEffect(() => {

        if(!HRVData) {
            return;
        }

        switch(hrvTranslation(HRVData, participant)) {
            case stressLevel.CALM:
                setBiophiliaLevel('tranquill');
                setBiophiliaColour('text-calm');
                break;
            
            case stressLevel.MODERATE:
                setBiophiliaLevel('balanced');
                setBiophiliaColour('text-moderate');
                break;
            
            case stressLevel.STRESSED:
                setBiophiliaLevel('tense');
                setBiophiliaColour('text-stressed');
                break;

        }
    }, [HRVData]);

    
    return (
        <SafeAreaView className="bg-background h-full relative">

            <View className="relative h-full w-full">

                {/* Log out button */}
                <View className="absolute top-0 right-0 p-2">
                    <Link href="/" asChild>
                        <Pressable>
                            <Text className="font-bold font-body text-secondary_text"> Log out </Text>
                        </Pressable>
                    </Link>
                </View>

                {/* Title */}
                <View className="flex justify-center items-center my-16">
                    <Text className="font-bold font-title text-3xl text-text">
                        Visualiser
                    </Text>
                    <Text className="font-body text-secondary_text">
                        Playback for {date}
                    </Text>
                </View>

                <View className='h-[50%] flex justify-center items-center'>
                    <Text className='font-body text-xl pb-2 text-text'>
                        You are feeling
                    </Text>

                    <Text className={`font-body text-7xl pb-2 ${biophiliaColour}`}>
                        {biophiliaLevel}
                    </Text>

                    <Text className='font-body text-xl text-text'>
                        right now
                    </Text>
                </View>

                <View className='flex justify-center items-center'>
                    <Text className='font-body text-text'>
                        {HRVData?.time}
                    </Text>
                </View>

            </View>

        </SafeAreaView>
    )
}

export default Visualiser;