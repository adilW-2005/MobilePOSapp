import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

function formatUSD(n: number) {
  return `$${n.toFixed(2)}`;
}

interface DonationSummaryProps {
  fundraiserName: string;
  fundName: string;
  amount: number;
}

export function DonationSummary({
  fundraiserName,
  fundName,
  amount,
}: DonationSummaryProps) {
  const handlePress = () => {
    router.push("/(tabs)/select_fundraiser");
  };

  return (
    <View className="px-4">
      <Pressable 
        onPress={handlePress}
        className="bg-white rounded-md border border-black/10 shadow-sm p-4"
      >
        <View className="flex-row">
          <View className="flex-1">
            <Text className="text-base text-slate-900">{fundraiserName}</Text>
            <Text className="text-xs text-slate-500 mt-0.5">{fundName}</Text>
          </View>
          <Text className="text-4xl text-slate-900 font-semibold">
            {formatUSD(amount)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
} 