import React from "react";
import { Text, Pressable } from "react-native";

interface PrimaryButtonProps {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
}

export function PrimaryButton({
  title,
  disabled,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={[
        "h-12 rounded-md items-center justify-center shadow-sm",
        disabled ? "bg-blue-600/50" : "bg-blue-600",
      ].join(" ")}
      style={({ pressed }) => (pressed && !disabled ? { opacity: 0.9 } : undefined)}
    >
      <Text className="text-white text-base font-semibold">{title}</Text>
    </Pressable>
  );
} 