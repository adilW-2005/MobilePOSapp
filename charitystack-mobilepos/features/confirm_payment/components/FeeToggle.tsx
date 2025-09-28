import React from "react";
import { View, Text, Pressable } from "react-native";

function formatUSD(n: number) {
  return `$${n.toFixed(2)}`;
}

interface FeeToggleProps {
  coverFee: boolean;
  onToggle: () => void;
  fee: number;
  total: number;
}

export function FeeToggle({
  coverFee,
  onToggle,
  fee,
  total,
}: FeeToggleProps) {
  return (
    <View className="px-4 mt-6">
      <Pressable
        onPress={onToggle}
        className="rounded-md"
        hitSlop={8}
      >
        <View className="flex-row items-center gap-3">
          {/* Checkbox */}
          <View
            className={[
              "w-5 h-5 rounded-[3px] border items-center justify-center",
              coverFee ? "bg-blue-600 border-blue-600" : "bg-white border-black/20",
            ].join(" ")}
          >
            {coverFee ? <Text className="text-white text-[12px]">✓</Text> : null}
          </View>
          <Text className="text-base text-slate-900">
            Yes, I'll cover the transaction fee
          </Text>
        </View>
      </Pressable>

      {/* Divider */}
      <View className="h-[1px] bg-zinc-300 my-3" />

      {/* Total row */}
      <View className="flex-row items-baseline justify-between">
        <Text className="text-base text-slate-900">Total</Text>
        <Text className="text-2xl text-slate-900">{formatUSD(total)}</Text>
      </View>
    </View>
  );
} 