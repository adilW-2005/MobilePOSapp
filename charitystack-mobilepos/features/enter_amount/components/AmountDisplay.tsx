import React from "react";
import { View, Text } from "react-native";

interface AmountDisplayProps {
  amount: string;
}

export function AmountDisplay({ amount }: AmountDisplayProps) {
  return (
    <View className="items-center mt-6">
      <Text className="text-7xl text-black">${amount}</Text>
    </View>
  );
} 