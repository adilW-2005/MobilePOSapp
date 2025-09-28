import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, // Hide tab bar since this appears to be a single screen flow
      }}
    >
      <Tabs.Screen
        name="select_fundraiser"
        options={{
          title: "Select Fundraiser",
        }}
      />
      <Tabs.Screen
        name="select_fund"
        options={{
          title: "Select Fund",
        }}
      />
      <Tabs.Screen
        name="enter_amount"
        options={{
          title: "Enter Amount",
        }}
      />
      <Tabs.Screen
        name="confirm_payment"
        options={{
          title: "Confirm Payment",
        }}
      />
      <Tabs.Screen
        name="contact_info"
        options={{
          title: "Contact Info",
        }}
      />
    </Tabs>
  );
} 