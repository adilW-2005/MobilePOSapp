import React from "react";
import { View, FlatList } from "react-native";
import { FundraiserCard } from "./FundraiserCard";

export type Fundraiser = { id: string; name: string };

interface FundraiserListProps {
  data: Fundraiser[];
  selectedId: string | null;
  onSelectFundraiser: (id: string) => void;
}

export function FundraiserList({
  data,
  selectedId,
  onSelectFundraiser,
}: FundraiserListProps) {
  return (
    <View className="flex-1 px-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FundraiserCard
            title={item.name}
            selected={item.id === selectedId}
            onPress={() => onSelectFundraiser(item.id)}
          />
        )}
      />
    </View>
  );
} 