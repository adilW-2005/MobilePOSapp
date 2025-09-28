import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

type Fund = { id: string; name: string };

const ALL_FUNDS: Fund[] = [
  { id: "ops", name: "Masjid Operations" },
  { id: "zakat", name: "Zakat" },
  { id: "sadaqah", name: "Sadaqah" },
  { id: "ramadan", name: "Ramadan" },
];

export default function SelectFund() {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("ops"); // preselected per mock

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ALL_FUNDS;
    return ALL_FUNDS.filter((f) => f.name.toLowerCase().includes(s));
  }, [q]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-4 pt-1 pb-2 flex-row items-center justify-between">
        <Pressable onPress={() => router.back()} hitSlop={10} className="w-6 h-6 items-center justify-center">
          <Text className="text-2xl text-slate-900">‹</Text>
        </Pressable>
        <Text className="text-xl text-slate-900 font-semibold">Select a Fund</Text>
        <View className="w-6" />
      </View>

      {/* Search */}
      <View className="px-4 pb-2">
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search for Fund"
          placeholderTextColor="#6B7280"
          className="bg-slate-100 border border-black/10 rounded-md px-3 py-3 text-base text-slate-900"
        />
      </View>

      {/* Fund list */}
      <View className="flex-1 px-4">
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View className="h-3" />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const selected = item.id === selectedId;
            return (
              <Pressable
                onPress={() => setSelectedId(item.id)}
                className={[
                  "h-16 rounded-md px-5 justify-center border shadow-sm",
                  selected ? "bg-blue-100 border-black/10" : "bg-white border-black/10",
                ].join(" ")}
                style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
              >
                <Text className={selected ? "text-slate-900 font-semibold" : "text-slate-900"}>
                  {item.name}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Continue */}
      <View className="px-4 pb-8">
        <Pressable
          disabled={!selectedId}
          onPress={() => {
            if (!selectedId) return;
            const selectedFund = ALL_FUNDS.find(f => f.id === selectedId);
            router.push({
              pathname: "/(tabs)/enter_amount",
              params: {
                fundId: selectedId,
                fundName: selectedFund?.name || ""
              }
            });
          }}
          className={[
            "h-12 rounded-md items-center justify-center shadow-sm",
            selectedId ? "bg-blue-600" : "bg-blue-600/50",
          ].join(" ")}
          style={({ pressed }) => (pressed && selectedId ? { opacity: 0.9 } : undefined)}
        >
          <Text className="text-white text-base font-semibold">Continue</Text>
        </Pressable>
      </View>


    </SafeAreaView>
  );
}
