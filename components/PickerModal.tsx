import { Modal, View, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PickerModalProps<T> {
    visible: boolean;
    onClose: () => void;
    selectedValue: T;
    onValueChange: (value: T) => void;
    options: Array<{ label: string, value: T }>;
}

const PickerModal = <T extends string | number>(props: PickerModalProps<T>) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={props.visible}
            onRequestClose={props.onClose}
        >
            <View className='flex-1 justify-center items-center bg-black/50'>
                <View className='w-[80%] bg-white rounded-lg overflow-hidden'>
                    <Picker
                        selectedValue={props.selectedValue}
                        onValueChange={props.onValueChange}
                        style={{ width: '100%' }}
                    >
                        {props.options.map(option => (
                            <Picker.Item key={option.value.toString()} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                    <Button title="Close" onPress={props.onClose} />
                </View>
            </View>
        </Modal>
    );
};

export default PickerModal;
