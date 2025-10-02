import React from "react";
import { View, Text } from "react-native";
import { FrequencyOption } from "./FrequencyOption";

const OPTIONS = ["Daily", "Weekly", "Monthly", "Annually"] as const;
export type Frequency = (typeof OPTIONS)[number];

interface BottomSheetProps {
  selected: Frequency;
  onSelect: (frequency: Frequency) => void;
}

export function BottomSheet({
  selected,
  onSelect,
}: BottomSheetProps) {
  return (
    <View>
      <View className="bg-white rounded-t-2xl px-6 py-5 pb-10">
        {/* Grabber */}
        <View className="items-center mb-4">
          <View className="w-16 h-[5px] bg-black/80 rounded-full" />
        </View>

        {/* Title */}
        <Text className="text-center text-2xl text-slate-900 mb-6">Frequency</Text>

        {/* Options */}
        <View className="gap-3">
          {OPTIONS.map((opt) => (
            <FrequencyOption
              key={opt}
              option={opt}
              selected={opt === selected}
              onSelect={() => onSelect(opt)}
            />
          ))}
        </View>
      </View>
    </View>
  );
} 