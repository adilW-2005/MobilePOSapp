import React from "react";
import { TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search for Fundraiser",
}: SearchBarProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#6B7280"
      className="
        bg-slate-100 border border-black/10 rounded-md
        px-3 py-3 text-base text-slate-900
      "
    />
  );
} 