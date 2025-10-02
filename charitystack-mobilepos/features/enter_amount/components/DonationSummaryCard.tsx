import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

interface DonationSummaryCardProps {
  fundraiserName: string;
  fundName: string;
}

export function DonationSummaryCard({
  fundraiserName,
  fundName,
}: DonationSummaryCardProps) {
  const handlePress = () => {
    router.push("/(tabs)/select_fundraiser");
  };

  return (
    <View className="bg-blue-100">
      <Pressable 
        onPress={handlePress}
        className="px-4 py-4 mx-4 mt-4 mb-3 bg-blue-100 rounded-md flex-row items-center justify-between"
      >
        <View className="flex-1">
          <Text className="text-lg text-slate-900">{fundraiserName}</Text>
          <Text className="text-sm text-slate-500 mt-1">{fundName}</Text>
        </View>
        <View className="w-6 h-6 items-center justify-center">
          <Text className="text-slate-900 text-xl">⌃</Text>
        </View>
      </Pressable>
    </View>
  );
} 