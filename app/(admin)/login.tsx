import { useState, useContext } from 'react';
import { View, Text, Image, Pressable, SafeAreaView } from "react-native"
import { Link, router } from 'expo-router';
import { GlobalContext } from '@/context/GlobalProvider';
import LogIn from '@/services/LogInService';

import FormField from "@/components/FormField";
import CustomButton from '@/components/CustomButton';

import { icons } from '@/constants';
import { AxiosError } from 'axios';

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

    const { setAdmin } = useContext(GlobalContext);

    const handleValidation = (): boolean => {
        let success = true;

        if(form.username.length === 0) {
            setUsernameError('Please enter a username');
            success = false;
        }

        if(form.password.length === 0) {
            setPasswordError('Please enter a password');
            success = false;
        }

        if(success) {
            setUsernameError(' ');
            setPasswordError(' ');
        }

        return success;
    }

    const handleLogin = (): void => {
        setIsLoading(true);
        
        if(!handleValidation()) {
            setIsLoading(false);
            return;
        }
        LogIn(form.username, form.password, setAdmin)
            .then((_) => {
                // Successfully logged in
                setIsLoading(false);
                router.push('/dashboard');
            }, (error) => {
                setIsLoading(false);
                handleLoginError(error.error as AxiosError);
        });
    }

    const handleLoginError = (error: AxiosError): void => {
        if (error.response?.status === 401) {
            setSubmissionError("Incorrect email or password");
        } else {
            setSubmissionError(error.response?.statusText ?? "Unable to communicate with server.");
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
                    <Text className="font-body text-secondary_text">For easy access to participant data and settings</Text>
                </View>

                <View className="my-8 flex justify-center">
                    <Text className="text-text font-body text-lg py-1">Username</Text>
                    <FormField<string>
                        value={form.username}
                        placeholder={'Enter your username'}
                        handleChangeValue={(e) => setForm({...form, username: e})}
                        isPassword={false}
                    />
                    <Text className='text-error -mt-6 text-sm'>{usernameError}</Text>

                    <Text className="text-text font-body text-lg py-1">Password</Text>
                    <FormField<string> 
                        value={form.password}
                        placeholder={'Enter your password'}
                        handleChangeValue={(e) => setForm({...form, password: e})}
                        isPassword={true}
                    />
                    <Text className='text-error -mt-6 text-sm'>{passwordError}</Text>

                    <Text className='text-error text-sm'>{submissionError}</Text>

                    <CustomButton 
                        title="Log In"
                        containerStyles="mt-8"
                        handlePress={() => handleLogin()}
                        isLoading={isLoading}
                    />
                </View>



            </View>
        </SafeAreaView>
    )
}

export default Login;