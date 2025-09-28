import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { BackButton, SearchBar, PrimaryButton, FundraiserList, Fundraiser } from "./components";

const ALL: Fundraiser[] = [
  { id: "1", name: "Support Nueces Reconstruction" },
  { id: "2", name: "General Campaign" },
  { id: "3", name: "Ramadan Operations Fundraiser 2025" },
  { id: "4", name: "2025 Spring Bake Sales" },
];

export default function SelectFundraiser() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>("2"); // like screenshot

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ALL;
    return ALL.filter((f) => f.name.toLowerCase().includes(s));
  }, [q]);

  const handleContinue = () => {
    if (!selected) return;
    const selectedFundraiser = ALL.find(f => f.id === selected);
    router.push({
      pathname: "/(tabs)/select_fund",
      params: {
        fundraiserId: selected,
        fundraiserName: selectedFundraiser?.name || ""
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-4 pt-1 pb-2 flex-row items-center justify-between">
        <BackButton />
        <Text className="text-xl text-slate-900 font-semibold">Select a Fundraiser</Text>
        <View className="w-6" />
      </View>

      {/* Search */}
      <View className="px-4 pb-2">
        <SearchBar value={q} onChangeText={setQ} />
      </View>

      {/* List */}
      <FundraiserList
        data={data}
        selectedId={selected}
        onSelectFundraiser={setSelected}
      />

      {/* CTA */}
      <View className="px-4 pb-8">
        <PrimaryButton
          title="Continue"
          disabled={!selected}
          onPress={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
}
