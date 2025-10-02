import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { BackButton, SearchBar, PrimaryButton, FundraiserList } from "./components";
import { PRESET_FUNDRAISERS } from "@/mock";

export default function SelectFundraiser() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>("2");

  const data = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return PRESET_FUNDRAISERS;
    return PRESET_FUNDRAISERS.filter(f => f.name.toLowerCase().includes(query));
  }, [q]);

  const handleContinue = () => {
    if (!selected) return;
    const selectedFundraiser = PRESET_FUNDRAISERS.find(f => f.id === selected);
    router.push({
      pathname: "/(tabs)/select_fund",
      params: {
        fundraiserId: selected,
        fundraiserName: selectedFundraiser?.name || ""
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
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
