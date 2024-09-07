import { SafeAreaView, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { useState, useContext } from 'react';
import getInstance from '@/services/SetAxiosHeaders';
import { GlobalContext } from '@/context/GlobalProvider';

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import enumToOptions from '@/utility/enumToOptions';

import { icons, activityLevel, gender, apiUrl } from '../constants';
import { AxiosError } from 'axios';

const Details = () => {

    const [form, setForm] = useState<ParticipantRegister>({
        firstName: '',
        lastName: '',
        email: '',
        activityLevel: activityLevel.SEDENTARY,
        age: 21,
        gender: gender.MALE
    });

    // Must be set to an empty space so the HTML element exists on the page
    // Then when an error is added it doesn't move the DOM elements below it
    const [firstNameError, setFirstNameError] = useState(' ');
    const [lastNameError, setLastNameError] = useState(' ');
    const [emailError, setEmailError] = useState(' ');
    const [ageError, setAgeError] = useState(' ');
    const [genderError, setGenderError] = useState(' ');
    const [activityLevelError, setActivityLevelError] = useState(' ');
    const [submissionError, setSubmissionError] = useState(' ');

    const [isLoading, setIsLoading] = useState(false);
    const { admin } = useContext(GlobalContext);

    const handleValidation = (): boolean => {
        let success = true;

        if(form.firstName === '') {
            success = false;
            setFirstNameError('Please enter your first name');
        }

        if(form.lastName === '') {
            success = false;
            setLastNameError('Please enter your last name');
        }

        if(form.email === '') {
            success = false;
            setEmailError('Please enter your email');
        }

        if(success) {
            setFirstNameError(' ');
            setLastNameError(' ');
            setEmailError(' ');
            setAgeError(' ');
            setGenderError(' ');
            setActivityLevelError(' ');
            setSubmissionError(' ');
        }

        return success;
    }

    const handleSubmit = (): void => {
        setIsLoading(true);

        if(!handleValidation()) {
            setIsLoading(false);
            return;
        }

        const axiosWithAuth = getInstance(admin?.token);
        axiosWithAuth.post(`${apiUrl}/participant`, form)
            .then((_) => {
                // Created participant
                setIsLoading(false);
                router.push('/terms_and_conditions');
            }, (error) => {
                setIsLoading(false);
                handleSubmitError(error as AxiosError)
            });
    }

    const handleSubmitError = (error: AxiosError): void => {
        if(error.response?.status === 422) {
            setSubmissionError("Unable to insert participant. This may be due to a faulty connection.");
        } else {
            setSubmissionError(error.response?.statusText ?? "Unable to communicate with server.");
        }
    }

    const debug = () => {
        router.push('/terms_and_conditions');
    }


    return (
        <SafeAreaView className="bg-background h-full relative">
            <ScrollView>

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
                        <Text className="font-bold font-title text-3xl text-text">Start with some details</Text>
                        <Text className="font-body text-secondary_text">It helps us get to know you better!</Text>
                    </View>


                    <View className="my-8 flex justify-center">

                        {/* First Name */}
                        <Text className="text-text font-body text-lg py-1">First Name</Text>
                        <FormField<string>
                            value={form.firstName}
                            placeholder={'John'}
                            handleChangeValue={(e) => setForm({...form, firstName: e})}
                            isPassword={false}
                        />
                        <Text className='text-error -mt-6 text-sm'>{firstNameError}</Text>

                        {/* Last Name */}
                        <Text className="text-text font-body text-lg py-1">Last Name</Text>
                        <FormField<string> 
                            value={form.lastName}
                            placeholder={'Smith'}
                            handleChangeValue={(e) => setForm({...form, lastName: e})}
                            isPassword={false}
                        />
                        <Text className='text-error -mt-6 text-sm'>{lastNameError}</Text>

                        {/* Email */}
                        <Text className="text-text font-body text-lg py-1">Email</Text>
                        <FormField<string> 
                            value={form.email}
                            placeholder={'John.Smith@email.com'}
                            handleChangeValue={(e) => setForm({...form, email: e})}
                            keyboardType='email-address'
                            isPassword={false}
                            helperText='We will keep your email private'
                        />
                        <Text className='text-error -mt-6 text-sm'>{emailError}</Text>

                        {/* Age and Gender */}
                        <View className='flex-row justify-between items-center w-full'>
                            {/* Age */}
                            <View className='w-[30%]'>
                                <Text className="text-text font-body text-lg py-1">Age</Text>
                                <FormField<number> 
                                    value={form.age}
                                    placeholder={''}
                                    handleChangeValue={(e) => setForm({...form, age: e})}
                                    keyboardType='numeric'
                                    isPassword={false}
                                />
                                <Text className='text-error -mt-6 text-sm'>{ageError}</Text>
                            </View>

                            {/* Gender */}
                            <View className='w-[60%]'>
                                <Text className="text-text font-body text-lg py-1">Gender</Text>
                                <FormField<gender> 
                                    value={form.gender}
                                    placeholder={form.gender.toString()}
                                    handleChangeValue={(e) => setForm({...form, gender: e})}
                                    keyboardType='default'
                                    enumOptions={enumToOptions(gender)}
                                    isPassword={false}
                                />
                                <Text className='text-error -mt-6 text-sm'>{genderError}</Text>
                            </View>
                        </View>
                        

                        {/* Activity Level */}
                        <Text className="text-text font-body text-lg py-1">Activity Level</Text>
                        <FormField<activityLevel> 
                            value={form.activityLevel}
                            placeholder={form.activityLevel.toString()}
                            handleChangeValue={(e) => setForm({...form, activityLevel: e})}
                            keyboardType='default'
                            enumOptions={enumToOptions(activityLevel)}
                            isPassword={false}
                        />
                        <Text className='text-error -mt-6 text-sm'>{activityLevelError}</Text>

                        <Text className='text-error text-sm'>{submissionError}</Text>

                        <CustomButton 
                            title="Next"
                            containerStyles="mt-8"
                            handlePress={() => debug()}
                            isLoading={isLoading}
                        />
                    </View>



                </View>   

            </ScrollView>         
        </SafeAreaView>
    )
}

export default Details;