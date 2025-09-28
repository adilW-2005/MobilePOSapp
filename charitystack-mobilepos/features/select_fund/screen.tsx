import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { BackButton, SearchBar, PrimaryButton, FundList, Fund } from "./components";

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

  const handleContinue = () => {
    if (!selectedId) return;
    const selectedFund = ALL_FUNDS.find(f => f.id === selectedId);
    router.push({
      pathname: "/(tabs)/enter_amount",
      params: {
        fundId: selectedId,
        fundName: selectedFund?.name || ""
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-4 pt-1 pb-2 flex-row items-center justify-between">
        <BackButton />
        <Text className="text-xl text-slate-900 font-semibold">Select a Fund</Text>
        <View className="w-6" />
      </View>

      {/* Search */}
      <View className="px-4 pb-2">
        <SearchBar value={q} onChangeText={setQ} />
      </View>

      {/* Fund list */}
      <FundList
        data={data}
        selectedId={selectedId}
        onSelectFund={setSelectedId}
      />

      {/* Continue */}
      <View className="px-4 pb-8">
        <PrimaryButton
          title="Continue"
          disabled={!selectedId}
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}
