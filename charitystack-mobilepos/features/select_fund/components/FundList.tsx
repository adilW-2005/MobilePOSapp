import React from "react";
import { View, FlatList } from "react-native";
import { FundCard } from "./FundCard";

export type Fund = { id: string; name: string };

interface FundListProps {
  data: Fund[];
  selectedId: string | null;
  onSelectFund: (id: string) => void;
}

export function FundList({
  data,
  selectedId,
  onSelectFund,
}: FundListProps) {
  return (
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
            <FundCard
              title={item.name}
              selected={selected}
              onPress={() => onSelectFund(item.id)}
            />
          );
        }}
      />
    </View>
  );
} 