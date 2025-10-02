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
        className="px-3 py-2 mx-2 mt-3 mb-2 bg-blue-100 rounded-md border border-black/10 flex-row items-center justify-between"
      >
        <View className="w-60">
          <Text className="text-base text-slate-900">{fundraiserName}</Text>
          <Text className="text-xs text-slate-500 mt-0.5">{fundName}</Text>
        </View>
        <View className="w-5 h-5 items-center justify-center">
          <Text className="text-slate-900 text-lg">⌄</Text>
        </View>
      </Pressable>
    </View>
  );
} 