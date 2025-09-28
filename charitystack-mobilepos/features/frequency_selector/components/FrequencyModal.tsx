import React from "react";
import { View, Pressable } from "react-native";
import { BottomSheet, Frequency } from "./";

interface FrequencyModalProps {
  visible: boolean;
  selected: Frequency;
  onSelect: (frequency: Frequency) => void;
  onClose: () => void;
}

export function FrequencyModal({
  visible,
  selected,
  onSelect,
  onClose,
}: FrequencyModalProps) {
  if (!visible) return null;

  const handleSelect = (frequency: Frequency) => {
    onSelect(frequency);
    onClose();
  };

  return (
    <View className="absolute inset-0 z-50">
      {/* Backdrop */}
      <Pressable
        className="absolute inset-0 bg-black/40"
        onPress={onClose}
      />
      
      {/* Modal Content */}
      <View className="flex-1 justify-end">
        <BottomSheet
          selected={selected}
          onSelect={handleSelect}
        />
      </View>
    </View>
  );
} 