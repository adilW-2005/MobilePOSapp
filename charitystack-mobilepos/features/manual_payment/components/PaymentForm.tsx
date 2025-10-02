import React from "react";
import { View, Text, TextInput } from "react-native";

interface PaymentFormProps {
  card: string;
  onChangeCard: (text: string) => void;
  exp: string;
  onChangeExp: (text: string) => void;
  cvc: string;
  onChangeCvc: (text: string) => void;
  zip: string;
  onChangeZip: (text: string) => void;
}

export function PaymentForm({
  card,
  onChangeCard,
  exp,
  onChangeExp,
  cvc,
  onChangeCvc,
  zip,
  onChangeZip,
}: PaymentFormProps) {
  return (
    <>
      {/* Card Number */}
      <View className="mb-3">
        <Text className="text-base text-slate-900 mb-1.5">Card Number</Text>
        <TextInput
          value={card}
          onChangeText={onChangeCard}
          keyboardType="number-pad"
          placeholder=""
          className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-2.5 text-base text-slate-900"
        />
      </View>

      {/* Exp / CVC / Zip */}
      <View className="flex-row gap-2.5 mb-3">
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-1.5">Expiration Date</Text>
          <TextInput
            value={exp}
            onChangeText={onChangeExp}
            keyboardType="number-pad"
            placeholder=""
            maxLength={5}
            className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-2.5 text-base text-slate-900"
          />
        </View>
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-1.5">Security Code</Text>
          <TextInput
            value={cvc}
            onChangeText={onChangeCvc}
            keyboardType="number-pad"
            placeholder=""
            maxLength={4}
            className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-2.5 text-base text-slate-900"
          />
        </View>
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-1.5">Zip/Postal</Text>
          <TextInput
            value={zip}
            onChangeText={onChangeZip}
            keyboardType="default"
            placeholder=""
            className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-2.5 text-base text-slate-900"
          />
        </View>
      </View>
    </>
  );
} 