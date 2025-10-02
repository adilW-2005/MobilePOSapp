import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { BackButton, SearchBar, PrimaryButton, FundList } from "./components";
import { PRESET_FUNDRAISERS } from "@/mock";

export default function SelectFund() {
  const { fundraiserId = "2", fundraiserName } = useLocalSearchParams<{
    fundraiserId?: string;
    fundraiserName?: string;
  }>();

  const fundraiser = PRESET_FUNDRAISERS.find(f => f.id === fundraiserId);
  const funds = fundraiser?.funds || [];

  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(funds[0]?.id || null);

  const data = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return funds;
    return funds.filter(f => f.name.toLowerCase().includes(query));
  }, [q, funds]);

  const handleContinue = () => {
    if (!selectedId) return;
    const selectedFund = funds.find(f => f.id === selectedId);
    router.push({
      pathname: "/(tabs)/enter_amount",
      params: {
        fundraiserId: fundraiserId,
        fundraiserName: fundraiserName || fundraiser?.name || "",
        fundId: selectedId,
        fundName: selectedFund?.name || ""
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-4 pt-8 pb-8 flex-row items-center justify-between">
        <BackButton />
        <Text className="text-xl text-slate-900 font-semibold">Select a Fund</Text>
        <View className="w-6" />
      </View>

      {/* Search */}
      <View className="px-4 pb-6">
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
