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
        "h-16 px-6 py-4 rounded-lg border border-black/10 justify-center",
        selected ? "bg-blue-100" : "bg-white",
      ].join(" ")}
    >
      <Text
        className={[
          "text-lg text-slate-900",
          selected ? "font-semibold" : "font-normal",
        ].join(" ")}
      >
        {option}
      </Text>
    </Pressable>
  );
} 