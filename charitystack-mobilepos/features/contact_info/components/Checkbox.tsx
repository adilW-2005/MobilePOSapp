import React from "react";
import { Text, Pressable } from "react-native";

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export function Checkbox({
  checked,
  onToggle,
}: CheckboxProps) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      className={[
        "w-5 h-5 rounded-[3px] border items-center justify-center",
        checked ? "bg-blue-600 border-blue-600" : "bg-white border-black/20",
      ].join(" ")}
    >
      {checked ? <Text className="text-white text-[12px]">✓</Text> : null}
    </Pressable>
  );
} 