import React from "react";
import { Text, Pressable } from "react-native";
import { router } from "expo-router";

interface PaymentButtonsProps {
  total: number;
  fundraiserName: string;
  fundName: string;
  onOpenManualPayment?: () => void;
}

export function PaymentButtons({
  total,
  fundraiserName,
  fundName,
  onOpenManualPayment,
}: PaymentButtonsProps) {
  const handleTapToPay = () => {
    router.push({
      pathname: "/(tabs)/contact_info",
      params: {
        amount: String(total),
        fundraiserName: String(fundraiserName),
        fundName: String(fundName),
        paymentMethod: "tap_to_pay"
      }
    });
  };

  const handleManualPayment = () => {
    onOpenManualPayment?.();
  };

  return (
    <>
      {/* CTA: Tap to Pay */}
      <Pressable
        onPress={handleTapToPay}
        className="h-11 mx-4 mb-2 rounded-md bg-blue-600 items-center justify-center shadow-sm"
        style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
      >
        <Text className="text-white text-base font-semibold">Tap to Pay</Text>
      </Pressable>

      {/* Secondary link */}
      <Pressable
        onPress={handleManualPayment}
        className="items-center mb-3"
      >
        <Text className="text-blue-700">Manual Payment</Text>
      </Pressable>
    </>
  );
} 