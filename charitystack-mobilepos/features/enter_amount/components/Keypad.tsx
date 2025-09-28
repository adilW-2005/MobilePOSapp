import React from "react";
import { View, Text, Pressable } from "react-native";

const KEYS = ["1","2","3","4","5","6","7","8","9",".","0","⌫"] as const;
export type Key = typeof KEYS[number];

interface KeypadProps {
  onKeyPress: (key: Key) => void;
}

export function Keypad({ onKeyPress }: KeypadProps) {
  return (
    <View className="mx-4 mt-6 rounded-md border border-black/10 p-3">
      <View className="flex-row flex-wrap">
        {KEYS.map((k, index) => (
          <Pressable
            key={k}
            onPress={() => onKeyPress(k)}
            className="h-16 items-center justify-center"
            style={{ width: '33.33%' }}
          >
            <Text className="text-4xl text-black">{k}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
} 