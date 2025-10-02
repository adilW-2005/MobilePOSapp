import React from "react";
import { Text, Pressable } from "react-native";

interface ContinueButtonProps {
  disabled?: boolean;
  onPress?: () => void;
}

export function ContinueButton({
  disabled,
  onPress,
}: ContinueButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={[
        "h-11 mx-4 mt-4 mb-8 rounded-md items-center justify-center",
        disabled ? "bg-blue-600/50" : "bg-blue-600",
      ].join(" ")}
      style={({ pressed }) => (pressed && !disabled ? { opacity: 0.9 } : undefined)}
    >
      <Text className="text-white text-base font-semibold">Continue</Text>
    </Pressable>
  );
} 