import React from "react";
import { View, Text } from "react-native";
import { PaymentForm } from "./PaymentForm";
import { ConfirmButton } from "./ConfirmButton";

interface BottomSheetProps {
  card: string;
  onChangeCard: (text: string) => void;
  exp: string;
  onChangeExp: (text: string) => void;
  cvc: string;
  onChangeCvc: (text: string) => void;
  zip: string;
  onChangeZip: (text: string) => void;
  valid: boolean;
  onConfirm: () => void;
}

export function BottomSheet({
  card,
  onChangeCard,
  exp,
  onChangeExp,
  cvc,
  onChangeCvc,
  zip,
  onChangeZip,
  valid,
  onConfirm,
}: BottomSheetProps) {
  return (
    <View className="bg-white rounded-t-2xl px-5 py-4 pb-8">
      {/* Grabber */}
      <View className="items-center mb-3">
        <View className="w-16 h-[5px] bg-black/80 rounded-full" />
      </View>

      {/* Title */}
      <Text className="text-center text-xl text-slate-900 mb-4">Manual Payment</Text>

      <PaymentForm
        card={card}
        onChangeCard={onChangeCard}
        exp={exp}
        onChangeExp={onChangeExp}
        cvc={cvc}
        onChangeCvc={onChangeCvc}
        zip={zip}
        onChangeZip={onChangeZip}
      />

      <ConfirmButton
        disabled={!valid}
        onPress={onConfirm}
      />
    </View>
  );
} 