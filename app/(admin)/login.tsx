import { useState } from 'react';
import { View, Text, Image, Pressable, SafeAreaView } from "react-native"
import { Link, router } from 'expo-router';

import FormField from "@/components/FormField";
import CustomButton from '@/components/CustomButton';

import { icons } from '../../constants';

const Login = () => {

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    // Must be set to an empty space so the HTML element exists on the page
    // Then when an error is added it doesn't move the DOM elements below it
    const [usernameError, setUsernameError] = useState(' ');
    const [passwordError, setPasswordError] = useState(' ');
    const [submissionError, setSubmissionError] = useState(' ');

    const submit = () => {
        setIsLoading(true);
        let success = true;

        if(form.username.length === 0) {
            setUsernameError('Please enter a username');
            success = false;
        }

        if(form.password.length === 0) {
            setPasswordError('Please enter a password');
            success = false;
        }

        // Perform call to backend
        // Set submission error if anything goes wrong
        
        setIsLoading(false);
        if(success) {
            setPasswordError(' ');
            setUsernameError(' ');
            setSubmissionError(' ');
            router.push('/dashboard');
        }
    }

    return (
        <SafeAreaView className="bg-background h-full relative">

            <View className="w-full h-full px-4">

                <View className="absolute top-0 left-0 px-4 py-2">
                    <Link href="" asChild>
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
                    <Text className="font-bold font-title text-3xl text-text">Administrator Login</Text>
                    <Text className="font-accent text-lg text-secondary_text">For easy access to participant data and settings</Text>
                </View>

                <View className="my-8 flex justify-center">
                    <Text className="text-text font-body text-lg py-1">Username</Text>
                    <FormField 
                        value={form.username}
                        placeholder={'Enter your username'}
                        handleChangeText={(e) => setForm({...form, username: e})}
                        isPassword={false}
                    />
                    <Text className='text-error -mt-6 text-sm'>{usernameError}</Text>

                    <Text className="text-text font-body text-lg py-1">Password</Text>
                    <FormField 
                        value={form.password}
                        placeholder={'Enter your password'}
                        handleChangeText={(e) => setForm({...form, password: e})}
                        isPassword={true}
                    />
                    <Text className='text-error -mt-6 text-sm'>{passwordError}</Text>

                    <Text className='text-error text-sm'>{submissionError}</Text>

                    <CustomButton 
                        title="Log In"
                        containerStyles="mt-8"
                        handlePress={() => submit()}
                        isLoading={isLoading}
                    />
                </View>



            </View>
        </SafeAreaView>
    )
}

export default Login;