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
        name="participant"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="session/[sessionId]/viewSession"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="session/[sessionId]/visualise"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AdminLayout;
