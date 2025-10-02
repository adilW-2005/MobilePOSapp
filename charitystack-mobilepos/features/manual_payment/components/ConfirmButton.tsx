import React from "react";
import { Text, Pressable } from "react-native";

interface ConfirmButtonProps {
  disabled?: boolean;
  onPress?: () => void;
}

export function ConfirmButton({
  disabled,
  onPress,
}: ConfirmButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={[
        "h-11 mt-2 rounded-lg shadow-sm items-center justify-center",
        disabled ? "bg-blue-600/50" : "bg-blue-600",
      ].join(" ")}
      style={({ pressed }) => (pressed && !disabled ? { opacity: 0.9 } : undefined)}
    >
      <Text className="text-white text-base font-semibold">Confirm</Text>
    </Pressable>
  );
} 