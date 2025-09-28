import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

function formatUSD(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function ConfirmPayment() {
  const { amount = "5", fundraiserName = "General Campaign", fundName = "Masjid Operations" } =
    useLocalSearchParams<{ amount?: string; fundraiserName?: string; fundName?: string }>();

  const baseAmount = Math.max(0, Number(amount) || 0);

  // Simple Stripe-like fee (2.9% + $0.30). Adjust if your processor differs.
  const [coverFee, setCoverFee] = useState(true);
  const fee = useMemo(() => baseAmount * 0.029 + 0.3, [baseAmount]);
  const total = useMemo(() => (coverFee ? baseAmount + fee : baseAmount), [coverFee, baseAmount, fee]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-4 pt-1 pb-2 flex-row items-center justify-between">
        <Pressable onPress={() => router.back()} hitSlop={10} className="w-6 h-6 items-center justify-center">
          <Text className="text-2xl text-slate-900">‹</Text>
        </Pressable>
        <Text className="text-xl text-slate-900">Select a Payment Method</Text>
        <View className="w-6" />
      </View>

      {/* Summary card */}
      <View className="px-4">
        <View className="bg-white rounded-md border border-black/10 shadow-sm p-4">
          <View className="flex-row">
            <View className="flex-1">
              <Text className="text-base text-slate-900">{String(fundraiserName)}</Text>
              <Text className="text-xs text-slate-500 mt-0.5">{String(fundName)}</Text>
            </View>
            <Text className="text-4xl text-slate-900 font-semibold">
              {formatUSD(baseAmount)}
            </Text>
          </View>
        </View>
      </View>

      {/* Fee toggle + total */}
      <View className="px-4 mt-6">
        <Pressable
          onPress={() => setCoverFee((v) => !v)}
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
              Yes, I’ll cover the transaction fee
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

      {/* Spacer to push CTAs to bottom */}
      <View className="flex-1" />

      {/* CTA: Tap to Pay */}
      <Pressable
        onPress={() => {
          // TODO: kick off Tap to Pay flow
          // router.push("/(donations)/processing");
        }}
        className="h-11 mx-4 mb-2 rounded-md bg-blue-600 items-center justify-center shadow-sm"
        style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
      >
        <Text className="text-white text-base font-semibold">Tap to Pay</Text>
      </Pressable>

      {/* Secondary link */}
      <Pressable
        onPress={() => {
          // TODO: manual entry route
          // router.push({ pathname: "/(donations)/manual-payment", params: { amount: String(total) } });
        }}
        className="items-center mb-3"
      >
        <Text className="text-blue-700">Manual Payment</Text>
      </Pressable>

      {/* iOS home indicator (visual only) */}
      <View className="self-center w-32 h-[5px] bg-black rounded-full mb-2" />
    </SafeAreaView>
  );
}
