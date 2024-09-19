import { Stack } from "expo-router";

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
        name="participants"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="visualiser"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="participant"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="session/[sessionId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AdminLayout;
