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
        <Text className="text-base text-slate-900 mb-2">Card Number</Text>
        <TextInput
          value={card}
          onChangeText={onChangeCard}
          keyboardType="number-pad"
          placeholder="1234 5678 9012 3456"
          className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
        />
      </View>

      {/* Exp / CVC / Zip */}
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-2">Expiration Date</Text>
          <TextInput
            value={exp}
            onChangeText={onChangeExp}
            keyboardType="number-pad"
            placeholder="MM/YY"
            maxLength={5}
            className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
          />
        </View>
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-2">Security Code</Text>
          <TextInput
            value={cvc}
            onChangeText={onChangeCvc}
            keyboardType="number-pad"
            placeholder="CVC"
            maxLength={4}
            className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
          />
        </View>
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-2">Zip/Postal</Text>
          <TextInput
            value={zip}
            onChangeText={onChangeZip}
            keyboardType="default"
            placeholder="12345"
            className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
          />
        </View>
      </View>
    </>
  );
} 