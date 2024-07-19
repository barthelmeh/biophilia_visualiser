import { useState } from 'react';
import { View, TextInput, Pressable, Image, Text } from 'react-native';
import PickerModal from '../components/PickerModal';

interface FormFieldProps<T extends string | number> {
    value: T,
    placeholder: string,
    handleChangeValue: (value: T) => void,
    isPassword: boolean,
    helperText?: string,
    otherStyles?: string,
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad',
    enumOptions?: Array<{ label: string, value: T }>
}

import { icons } from '../constants';

const FormField = <T extends string | number,>(props: FormFieldProps<T>) => {

    const [showPassword, setShowPassword] = useState(false);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handlePickerClose = () => setPickerVisible(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <View className={`mb-8 ${props.otherStyles ?? ""}`}>
            <View 
                style={{...(props.enumOptions ? {paddingRight: 0} : {})}}
                className={`flex flex-row items-center w-full h-14 px-4 rounded-xl border-2 ${isFocused ? 'border-secondary_text' : 'border-accent'}`}
            >
                {props.enumOptions 
                    ? (
                        <Pressable onPress={() => setPickerVisible(true)} style={{flex: 1}}>
                            <Text style={{ flex: 1, paddingVertical: 15 }}>
                                {props.value.toString()}
                            </Text>
                        </Pressable>
                    )
                    : (
                        <TextInput
                            className="flex-1"
                            style={[]}
                            value={props.value.toString()}
                            placeholder={props.placeholder}
                            placeholderTextColor='#5b7b6f'
                            onChangeText={(text) => props.handleChangeValue(text as unknown as T)}
                            secureTextEntry={props.isPassword && !showPassword}
                            keyboardType={props.keyboardType}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    )
                }
                
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

            {props.enumOptions && (
                <PickerModal
                    visible={isPickerVisible}
                    onClose={handlePickerClose}
                    selectedValue={props.value}
                    onValueChange={(value) => {
                        props.handleChangeValue(value);
                        handlePickerClose();
                    }}
                    options={props.enumOptions}
                />
            )}
            {props.helperText && 
                (
                    <Text className="text-accent text-sm tracking-tight font-body">{props.helperText}</Text>
                )
            }
            

        </View>
    );
}

export default FormField;