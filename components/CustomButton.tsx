import { Pressable, Text, GestureResponderEvent, View } from 'react-native';
import { forwardRef } from 'react';

interface CustomButtonProps {
    title: string,
    isLoading: boolean,
    containerStyles?: string,
    textStyles?: string,
    handlePress?: (event: GestureResponderEvent) => void,
}

const CustomButton = forwardRef<View, CustomButtonProps>(( props: CustomButtonProps, ref ) => {

    return (
        <Pressable
            className={`flex justify-center items-center shadow-sm py-1 px-4 rounded-full ${props.containerStyles} ${props.isLoading ? "bg-button opacity-25 cursor-not-allowed" : "bg-button"}`}
            onPress={props.handlePress}
            disabled={props.isLoading}
            ref={ref}
        >
            <Text className={`font-body text-secondary_text text-lg ${props.textStyles}`}>
                {props.title}
            </Text>
        </Pressable>
    )

});

export default CustomButton;