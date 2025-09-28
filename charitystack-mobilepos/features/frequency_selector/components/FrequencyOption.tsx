import React from "react";
import { Text, Pressable } from "react-native";

interface FrequencyOptionProps {
  option: string;
  selected: boolean;
  onSelect: () => void;
}

export function FrequencyOption({
  option,
  selected,
  onSelect,
}: FrequencyOptionProps) {
  return (
    <Pressable
      onPress={onSelect}
      className={[
        "h-16 px-5 py-3 rounded-md border shadow-sm justify-center",
        selected ? "bg-blue-100 border-black/10" : "bg-slate-50 border-black/10",
      ].join(" ")}
      style={({ pressed }) => (pressed ? { opacity: 0.95 } : undefined)}
    >
      <Text
        className={[
          "text-base text-slate-900",
          selected ? "font-semibold" : "font-normal",
        ].join(" ")}
      >
        {option}
      </Text>
    </Pressable>
  );
} 