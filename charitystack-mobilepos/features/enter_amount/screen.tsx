import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

const KEYS = ["1","2","3","4","5","6","7","8","9",".","0","⌫"] as const;
type Key = typeof KEYS[number];

export default function EnterAmount() {
  // optionally receive from previous screen
  const { fundraiserName = "General Campaign", fundName = "Masjid Operations" } =
    useLocalSearchParams<{ fundraiserName?: string; fundName?: string }>();

  const [amount, setAmount] = useState<string>("5");      // prefilled like mock
  const [repeat, setRepeat] = useState<"one" | "recurring">("one");

  const display = useMemo(() => (amount.length ? amount : "0"), [amount]);
  const isValid = useMemo(() => Number(display) > 0, [display]);

  function onKey(k: Key) {
    if (k === "⌫") {
      setAmount((s) => s.slice(0, -1));
      return;
    }
    if (k === ".") {
      setAmount((s) => (s.includes(".") ? s : s.length ? s + "." : "0."));
      return;
    }
    // digit
    setAmount((s) => {
      // avoid leading zeros like "00"
      if (!s.length && k === "0") return "0";
      // limit to 2 decimals if you want: (uncomment)
      // const [a,b=""] = (s + k).split(".");
      // if (b.length > 2) return s;
      return (s === "0") ? k : s + k;
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      {/* Top banner with selection */}
      <View className="bg-blue-100">
        <View className="px-3 py-2 mx-2 mt-3 mb-2 bg-blue-100 rounded-md border border-black/10 flex-row items-center justify-between">
          <View className="w-60">
            <Text className="text-base text-slate-900">{String(fundraiserName)}</Text>
            <Text className="text-xs text-slate-500 mt-0.5">{String(fundName)}</Text>
          </View>
          <Pressable onPress={() => router.back()} hitSlop={10} className="w-5 h-5 items-center justify-center">
            <Text className="text-slate-900 text-lg">⌄</Text>
          </Pressable>
        </View>
      </View>

      {/* Amount */}
      <View className="items-center mt-6">
        <Text className="text-7xl text-black">${display}</Text>
      </View>

      {/* Segmented control */}
      <View className="px-4 mt-6">
        <View className="p-[1px] bg-slate-100 rounded-md border border-black/10 flex-row">
          <Pressable
            onPress={() => setRepeat("one")}
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
            onPress={() => {
              setRepeat("recurring");
              router.push({
                pathname: "/(modals)/frequency_selector",
                params: {
                  value: "Monthly",
                  returnTo: "/(tabs)/enter_amount"
                }
              });
            }}
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

      {/* Keypad */}
      <View className="mx-4 mt-6 rounded-md border border-black/10 p-3">
        <View className="flex-row flex-wrap">
          {KEYS.map((k, index) => (
            <Pressable
              key={k}
              onPress={() => onKey(k)}
              className="h-16 items-center justify-center"
              style={{ width: '33.33%' }}
            >
              <Text className="text-4xl text-black">{k}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Continue */}
      <Pressable
        disabled={!isValid}
        onPress={() => {
          router.push({
            pathname: "/(tabs)/confirm_payment",
            params: {
              amount: display,
              repeat: repeat,
              fundraiserName: String(fundraiserName),
              fundName: String(fundName)
            }
          });
        }}
        className={[
          "h-11 mx-4 mt-auto mb-4 rounded-md items-center justify-center",
          isValid ? "bg-blue-600" : "bg-blue-600/50",
        ].join(" ")}
        style={({ pressed }) => (pressed && isValid ? { opacity: 0.9 } : undefined)}
      >
        <Text className="text-white text-base font-semibold">Continue</Text>
      </Pressable>


    </SafeAreaView>
  );
}
