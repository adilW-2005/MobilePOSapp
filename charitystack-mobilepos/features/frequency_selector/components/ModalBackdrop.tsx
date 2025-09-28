import React from "react";
import { Pressable } from "react-native";
import { router } from "expo-router";

export function ModalBackdrop() {
  return (
    <Pressable
      className="absolute inset-0 bg-black/40"
      onPress={() => router.back()}
    />
  );
} 