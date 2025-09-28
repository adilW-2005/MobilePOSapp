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
  return (
    <View className="bg-blue-100">
      <View className="px-3 py-2 mx-2 mt-3 mb-2 bg-blue-100 rounded-md border border-black/10 flex-row items-center justify-between">
        <View className="w-60">
          <Text className="text-base text-slate-900">{fundraiserName}</Text>
          <Text className="text-xs text-slate-500 mt-0.5">{fundName}</Text>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={10} className="w-5 h-5 items-center justify-center">
          <Text className="text-slate-900 text-lg">⌄</Text>
        </Pressable>
      </View>
    </View>
  );
} 