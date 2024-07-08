import { Stack } from 'expo-router';

const AdminLayout = () => {
    
    return (
        <Stack>
            <Stack.Screen
            name="login"
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen
            name="dashboard"
            options={{
                headerShown: false,
            }}
            />
        </Stack>
    )
}

export default AdminLayout;