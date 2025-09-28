import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

/** --- tiny UI bits (inline) ------------------------------------ */

function BackButton() {
  return (
    <Pressable
      onPress={() => router.back()}
      hitSlop={10}
      className="w-6 h-6 items-center justify-center"
    >
      <Text className="text-2xl text-slate-900">‹</Text>
    </Pressable>
  );
}

function SearchBar({
  value,
  onChangeText,
  placeholder = "Search for Fundraiser",
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  return (
    <View className="px-4 pt-2 pb-3">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        className="
          bg-slate-100 border border-black/10 rounded-md
          px-3 py-2 text-base text-slate-900
        "
      />
    </View>
  );
}

function FundraiserCard({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={[
        "h-16 rounded-md px-5 justify-center border shadow-sm",
        selected ? "bg-blue-100 border-black/10" : "bg-white border-black/10",
      ].join(" ")}
      style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
    >
      <Text className={selected ? "text-slate-900 font-semibold" : "text-slate-900"}>
        {title}
      </Text>
    </Pressable>
  );
}

function PrimaryButton({
  title,
  disabled,
  onPress,
}: {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={[
        "h-11 mx-4 mb-4 rounded-md items-center justify-center",
        disabled ? "bg-blue-600/50" : "bg-blue-600",
        "shadow-sm",
      ].join(" ")}
      style={({ pressed }) => (pressed && !disabled ? { opacity: 0.9 } : undefined)}
    >
      <Text className="text-white text-base font-semibold">{title}</Text>
    </Pressable>
  );
}

/** --- screen ---------------------------------------------------- */

type Fundraiser = { id: string; name: string };
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

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="px-4 pt-1 pb-2 flex-row items-center justify-between">
        <BackButton />
        <Text className="text-xl text-slate-900 font-semibold">Select a Fundraiser</Text>
        <View className="w-6" />
      </View>

      {/* Search */}
      <SearchBar value={q} onChangeText={setQ} />

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <FundraiserCard
            title={item.name}
            selected={item.id === selected}
            onPress={() => setSelected(item.id)}
          />
        )}
      />

      {/* CTA */}
      <PrimaryButton
        title="Continue"
        disabled={!selected}
        onPress={() => {
          if (!selected) return;
          // TODO: router.push({ pathname: "/next", params: { fundraiserId: selected } })
        }}
      />

      {/* iOS home indicator bar (purely visual) */}
      <View className="self-center w-32 h-[5px] bg-black rounded-full mb-2" />
    </SafeAreaView>
  );
}
