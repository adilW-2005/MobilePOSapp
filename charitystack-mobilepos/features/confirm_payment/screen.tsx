import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { BackButton, DonationSummary, FeeToggle, PaymentButtons } from "./components";
import { ManualPaymentModal } from "../manual_payment/modal";

export default function ConfirmPayment() {
  const { amount = "5", fundraiserName = "General Campaign", fundName = "Masjid Operations" } =
    useLocalSearchParams<{ amount?: string; fundraiserName?: string; fundName?: string }>();

  const baseAmount = Math.max(0, Number(amount) || 0);

  // Simple Stripe-like fee (2.9% + $0.30). Adjust if your processor differs.
  const [coverFee, setCoverFee] = useState(true);
  const [showManualPaymentModal, setShowManualPaymentModal] = useState(false);
  
  const fee = useMemo(() => baseAmount * 0.029 + 0.3, [baseAmount]);
  const total = useMemo(() => (coverFee ? baseAmount + fee : baseAmount), [coverFee, baseAmount, fee]);

  const handleOpenManualPayment = () => {
    setShowManualPaymentModal(true);
  };

  const handleManualPaymentConfirm = (paymentData: {
    card: string;
    exp: string;
    cvc: string;
    zip: string;
  }) => {
    // TODO: Process payment data
    // Navigate to contact info with manual payment method
    router.push({
      pathname: "/(tabs)/contact_info",
      params: {
        amount: String(total),
        fundraiserName: String(fundraiserName),
        fundName: String(fundName),
        paymentMethod: "manual_card"
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-4 pt-1 pb-2 flex-row items-center justify-between">
        <BackButton />
        <Text className="text-xl text-slate-900">Select a Payment Method</Text>
        <View className="w-6" />
      </View>

      {/* Summary card */}
      <DonationSummary
        fundraiserName={String(fundraiserName)}
        fundName={String(fundName)}
        amount={baseAmount}
      />

      {/* Fee toggle + total */}
      <FeeToggle
        coverFee={coverFee}
        onToggle={() => setCoverFee((v) => !v)}
        fee={fee}
        total={total}
      />

      {/* Spacer to push CTAs to bottom */}
      <View className="flex-1" />

      {/* Payment buttons */}
      <PaymentButtons
        total={total}
        fundraiserName={String(fundraiserName)}
        fundName={String(fundName)}
        onOpenManualPayment={handleOpenManualPayment}
      />

      {/* Manual Payment Modal Overlay */}
      <ManualPaymentModal
        visible={showManualPaymentModal}
        amount={String(total)}
        fundraiserName={String(fundraiserName)}
        fundName={String(fundName)}
        onConfirm={handleManualPaymentConfirm}
        onClose={() => setShowManualPaymentModal(false)}
      />
    </SafeAreaView>
  );
}
