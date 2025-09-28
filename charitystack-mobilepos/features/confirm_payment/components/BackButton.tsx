import React from "react";
import { Text, Pressable } from "react-native";
import { router } from "expo-router";

export function BackButton() {
  return (
    <Pressable onPress={() => router.back()} hitSlop={10} className="w-6 h-6 items-center justify-center">
      <Text className="text-2xl text-slate-900">‹</Text>
    </Pressable>
  );
} 