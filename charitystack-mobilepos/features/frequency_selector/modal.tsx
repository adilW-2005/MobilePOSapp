import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ModalBackdrop, BottomSheet, Frequency } from "./components";

export default function FrequencySelector() {
  const { value, returnTo } = useLocalSearchParams<{
    value?: Frequency;
    returnTo?: string; // e.g. "/(donations)/enter-amount"
  }>();

  const [selected, setSelected] = useState<Frequency>((value as Frequency) || "Daily");

  function onSelect(next: Frequency) {
    setSelected(next);
    // Close the modal and return to the previous screen
    router.dismiss();
    // Note: In a real app, you'd pass the frequency back to the calling screen
    // For now, we'll just close the modal
  }

  return (
    <SafeAreaView className="flex-1">
      <ModalBackdrop />
      <BottomSheet
        selected={selected}
        onSelect={onSelect}
      />
    </SafeAreaView>
  );
}
