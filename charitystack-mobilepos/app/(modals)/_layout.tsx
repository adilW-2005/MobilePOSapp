import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "transparentModal",
        headerShown: false,
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen
        name="frequency_selector"
        options={{
          title: "Select Frequency",
        }}
      />
      <Stack.Screen
        name="manual_payment"
        options={{
          title: "Manual Payment",
        }}
      />
    </Stack>
  );
} 