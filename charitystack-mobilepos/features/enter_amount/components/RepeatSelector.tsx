import React from "react";
import { View, Text, Pressable } from "react-native";

interface RepeatSelectorProps {
  repeat: "one" | "recurring";
  onSelectRepeat: (repeat: "one" | "recurring") => void;
  onOpenFrequencyModal?: () => void;
}

export function RepeatSelector({
  repeat,
  onSelectRepeat,
  onOpenFrequencyModal,
}: RepeatSelectorProps) {
  const handleRecurringPress = () => {
    onSelectRepeat("recurring");
    onOpenFrequencyModal?.();
  };

  return (
    <View className="px-4 mt-14">
      <View className="p-[1px] bg-slate-100 rounded-md border border-black/10 flex-row">
        <Pressable
          onPress={() => onSelectRepeat("one")}
          className={[
            "flex-1 px-5 py-2.5 rounded-md items-center justify-center",
            repeat === "one" ? "bg-blue-100" : "bg-white",
          ].join(" ")}
        >
          <Text className={repeat === "one" ? "text-slate-900 font-semibold" : "text-slate-600"}>
            One-Time
          </Text>
        </Pressable>
        <Pressable
          onPress={handleRecurringPress}
          className={[
            "flex-1 px-5 py-2.5 rounded-md items-center justify-center",
            repeat === "recurring" ? "bg-blue-100" : "bg-white",
          ].join(" ")}
        >
          <Text className={repeat === "recurring" ? "text-slate-900 font-semibold" : "text-slate-600"}>
            Repeat
          </Text>
        </Pressable>
      </View>
    </View>
  );
} 