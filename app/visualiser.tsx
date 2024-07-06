import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import useGenerator from '@/hooks/useGenerator';

// For now, import data for the generator from a .json
// Should be linked up to the database
import hrv_data from '../assets/dummy_data.json';

const Visualiser = () => {

    const HRVData = useGenerator(hrv_data);

    return (
        <SafeAreaView className="bg-background h-full">

            <View className="w-full h-full flex flex-col gap-2 justify-center items-center">
                <Text className='font-body text-text font-bold text-xl'>
                    {HRVData?.Time}
                </Text>
                <Text className='font-body text-text font-bold text-xl'>
                    {HRVData?.HRV}
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default Visualiser;