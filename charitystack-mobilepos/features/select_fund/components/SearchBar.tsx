import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search for Fund",
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-slate-100 border border-black/10 rounded-md px-3 py-2.5">
    <Ionicons name="search" size={20} color="#6B7280" />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#6B7280"
      className="flex-1 ml-2 text-base text-slate-900"
    />
  </View>
  );
} 