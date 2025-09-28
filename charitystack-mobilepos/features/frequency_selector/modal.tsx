import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";

const OPTIONS = ["Daily", "Weekly", "Monthly", "Annually"] as const;
type Frequency = (typeof OPTIONS)[number];

export default function FrequencySelector() {
  const { value, returnTo } = useLocalSearchParams<{
    value?: Frequency;
    returnTo?: string; // e.g. "/(donations)/enter-amount"
  }>();

  const [selected, setSelected] = useState<Frequency>((value as Frequency) || "Daily");

  function onSelect(next: Frequency) {
    setSelected(next);
    if (returnTo) {
      router.replace({ pathname: String(returnTo), params: { frequency: next } });
    } else {
      router.back();
    }
  }

  return (
    <SafeAreaView className="flex-1">
      {/* Dimmed backdrop */}
      <Pressable
        className="absolute inset-0 bg-black/40"
        onPress={() => router.back()}
      />

      {/* Bottom sheet */}
      <View className="absolute left-0 right-0 bottom-0 px-4 pb-6">
        <View className="bg-white rounded-t-md border border-black/10 shadow-sm px-5 py-3.5">
          {/* Grabber */}
          <View className="items-center mb-2">
            <View className="w-16 h-[5px] bg-black/80 rounded-full" />
          </View>

          {/* Title */}
          <Text className="text-center text-xl text-slate-900 mb-3">Frequency</Text>

          {/* Options */}
          <View className="gap-2">
            {OPTIONS.map((opt) => {
              const isSel = opt === selected;
              return (
                <Pressable
                  key={opt}
                  onPress={() => onSelect(opt)}
                  className={[
                    "h-16 px-5 py-3 rounded-md border shadow-sm justify-center",
                    isSel ? "bg-blue-100 border-black/10" : "bg-slate-50 border-black/10",
                  ].join(" ")}
                  style={({ pressed }) => (pressed ? { opacity: 0.95 } : undefined)}
                >
                  <Text
                    className={[
                      "text-base text-slate-900",
                      isSel ? "font-semibold" : "font-normal",
                    ].join(" ")}
                  >
                    {opt}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
