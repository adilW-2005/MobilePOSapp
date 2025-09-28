import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { 
  DonationSummaryCard, 
  AmountDisplay, 
  RepeatSelector, 
  Keypad, 
  ContinueButton,
  Key 
} from "./components";
import { FrequencyModal, Frequency } from "../frequency_selector/components";

export default function EnterAmount() {
  // optionally receive from previous screen
  const { fundraiserName = "General Campaign", fundName = "Masjid Operations" } =
    useLocalSearchParams<{ fundraiserName?: string; fundName?: string }>();

  const [amount, setAmount] = useState<string>("5");      // prefilled like mock
  const [repeat, setRepeat] = useState<"one" | "recurring">("one");
  const [frequency, setFrequency] = useState<Frequency>("Monthly");
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);

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

  const handleContinue = () => {
    router.push({
      pathname: "/(tabs)/confirm_payment",
      params: {
        amount: display,
        repeat: repeat,
        frequency: repeat === "recurring" ? frequency : undefined,
        fundraiserName: String(fundraiserName),
        fundName: String(fundName)
      }
    });
  };

  const handleOpenFrequencyModal = () => {
    setShowFrequencyModal(true);
  };

  const handleFrequencySelect = (selectedFrequency: Frequency) => {
    setFrequency(selectedFrequency);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      {/* Top banner with selection */}
      <DonationSummaryCard
        fundraiserName={String(fundraiserName)}
        fundName={String(fundName)}
      />

      {/* Amount */}
      <AmountDisplay amount={display} />

      {/* Segmented control */}
      <RepeatSelector
        repeat={repeat}
        onSelectRepeat={setRepeat}
        onOpenFrequencyModal={handleOpenFrequencyModal}
      />

      {/* Keypad */}
      <Keypad onKeyPress={onKey} />

      {/* Continue */}
      <ContinueButton
        disabled={!isValid}
        onPress={handleContinue}
      />

      {/* Frequency Modal Overlay */}
      <FrequencyModal
        visible={showFrequencyModal}
        selected={frequency}
        onSelect={handleFrequencySelect}
        onClose={() => setShowFrequencyModal(false)}
      />
    </SafeAreaView>
  );
}
