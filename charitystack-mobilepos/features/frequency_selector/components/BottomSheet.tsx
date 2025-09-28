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