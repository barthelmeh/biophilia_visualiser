import { useState } from 'react';
import { View, TextInput, Pressable, Image } from 'react-native';

interface FormFieldProps {
    value: string,
    placeholder: string,
    handleChangeText: (text: string) => void,
    isPassword: boolean,
    otherStyles?: string
}

import { icons } from '../constants';

const FormField = (props: FormFieldProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`mb-8 ${props.otherStyles ?? ""}`}>
            <View className='flex flex-row items-center w-full h-14 px-4 rounded-xl border-2 border-accent focus:border-secondary_text'>
                <TextInput
                    className='flex-1'
                    value={props.value}
                    placeholder={props.placeholder}
                    placeholderTextColor='#5b7b6f'
                    onChangeText={props.handleChangeText}
                    secureTextEntry={props.isPassword && !showPassword}
                />
                {
                    props.isPassword &&
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                            source={!showPassword ? icons.eye : icons.eyeHide }
                            className='w-5 h-5'
                            resizeMode='contain'
                        />
                    </Pressable>
                }
            </View>
        </View>
    );
}

export default FormField;