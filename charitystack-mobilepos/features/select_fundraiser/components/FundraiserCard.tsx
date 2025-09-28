import React from "react";
import { Text, Pressable } from "react-native";

interface FundraiserCardProps {
  title: string;
  selected?: boolean;
  onPress?: () => void;
}

export function FundraiserCard({
  title,
  selected,
  onPress,
}: FundraiserCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={[
        "h-16 rounded-md px-5 justify-center border shadow-sm",
        selected ? "bg-blue-100 border-black/10" : "bg-white border-black/10",
      ].join(" ")}
      style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
    >
      <Text className={selected ? "text-slate-900 font-semibold" : "text-slate-900"}>
        {title}
      </Text>
    </Pressable>
  );
} 