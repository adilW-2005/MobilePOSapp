import React from "react";
import { View, Text, Pressable } from "react-native";

const KEYS = ["1","2","3","4","5","6","7","8","9",".","0","⌫"] as const;
export type Key = typeof KEYS[number];

interface KeypadProps {
  onKeyPress: (key: Key) => void;
}

export function Keypad({ onKeyPress }: KeypadProps) {
  const rows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "⌫"]
  ];

  return (
    <View className="mx-4 mt-6enter flex-1 p-3 justify-around">
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row">
          {row.map((k) => (
            <Pressable
              key={k}
              onPress={() => onKeyPress(k as Key)}
              className="flex-1 items-center justify-center"
            >
              <Text className="text-4xl text-black">{k}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
} 