import { SafeAreaView, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import enumToOptions from '@/components/enumToOptions';

import { icons, activityLevel } from '../constants';

const Details = () => {

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        activityLevel: activityLevel.Sedentary,
        age: 21
    });

    // Must be set to an empty space so the HTML element exists on the page
    // Then when an error is added it doesn't move the DOM elements below it
    const [firstNameError, setFirstNameError] = useState(' ');
    const [lastNameError, setLastNameError] = useState(' ');
    const [emailError, setEmailError] = useState(' ');
    const [ageError, setAgeError] = useState(' ');
    const [activityLevelError, setActivityLevelError] = useState(' ');
    const [submissionError, setSubmissionError] = useState(' ');

    const [isLoading, setIsLoading] = useState(false);

    const submit = () => {
        setIsLoading(true);
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
            setIsLoading(false);
            setFirstNameError(' ');
            setLastNameError(' ');
            setEmailError(' ');
            setAgeError(' ');
            setActivityLevelError(' ');
            setSubmissionError(' ');

            router.push('/terms_and_conditions');
        }
        setIsLoading(false);

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

                        {/* Age */}
                        <Text className="text-text font-body text-lg py-1">Age</Text>
                        <FormField<number> 
                            value={form.age}
                            placeholder={form.age.toString()}
                            handleChangeValue={(e) => setForm({...form, age: e})}
                            keyboardType='numeric'
                            isPassword={false}
                            otherStyles='w-16'
                        />
                        <Text className='text-error -mt-6 text-sm'>{ageError}</Text>

                        {/* Activity Level */}
                        <Text className="text-text font-body text-lg py-1">Activity Level</Text>
                        <FormField<activityLevel> 
                            value={form.activityLevel}
                            placeholder={form.activityLevel.toString()}
                            handleChangeValue={(e) => setForm({...form, activityLevel: e})}
                            keyboardType='email-address'
                            enumOptions={enumToOptions(activityLevel)}
                            isPassword={false}
                        />
                        <Text className='text-error -mt-6 text-sm'>{activityLevelError}</Text>

                        <Text className='text-error text-sm'>{submissionError}</Text>

                        <CustomButton 
                            title="Next"
                            containerStyles="mt-8"
                            handlePress={() => submit()}
                            isLoading={isLoading}
                        />
                    </View>



                </View>   

            </ScrollView>         
        </SafeAreaView>
    )
}

export default Details;