import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, Image } from "react-native";
import CheckBox from "expo-checkbox";
import { router, Link } from "expo-router";
import CustomButton from '@/components/CustomButton';

import { icons } from '../constants';

const TermsConditions = () => {

    const [isChecked, setIsChecked] = useState(false);

    return (
        <SafeAreaView className="bg-background h-full relative">
            <ScrollView>
                <View className="w-full h-full px-4">

                    <View className="absolute top-0 left-0 px-4 py-2">
                            <Link href="/details" asChild>
                                <Pressable>
                                    <Image 
                                        source={icons.leftArrow}
                                        className="h-4 w-4 text-secondary_text"
                                        resizeMode="contain"
                                    />
                                </Pressable>
                            </Link>
                        </View>
                    
                    <View className="flex justify-center items-center my-16">
                        <Text className="font-bold font-title text-3xl text-text">
                            Terms and Conditions
                        </Text>
                        <Text className="font-body text-secondary_text">
                            Please make sure you read the terms and conditions
                        </Text>
                    </View>

                    <View>
                        <Text className="text-text font-body">
                            Placeholder for the terms and conditions document
                        </Text>
                    </View>

                    <View className="flex flex-row gap-4 mt-8 mb-6 items-center">
                        <CheckBox
                            value={isChecked}
                            onValueChange={(e) => setIsChecked(e)}
                        />
                        <Text className="text-xs text-text font-body">
                            I confirm that I have read and accept the Terms and Conditions
                        </Text>
                    </View>

                    <CustomButton 
                        title={'Next'}
                        isLoading={false}
                        disabled={!isChecked}
                        handlePress={() => router.push('/visualiser')}
                    />
 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TermsConditions;