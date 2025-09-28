import React, { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

export default function ManualPayment() {
  const { amount, fundraiserName, fundName } = useLocalSearchParams<{
    amount?: string;
    fundraiserName?: string;
    fundName?: string;
  }>();

  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");   // MM/YY
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");

  // light input helpers
  function onChangeCard(t: string) {
    // strip non-digits & group 4-4-4-4 visually
    const d = t.replace(/\D/g, "").slice(0, 19);
    const groups = d.match(/.{1,4}/g) ?? [];
    setCard(groups.join(" "));
  }
  function onChangeExp(t: string) {
    const d = t.replace(/\D/g, "").slice(0, 4);
    setExp(d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d);
  }

  const valid = useMemo(() => {
    const expOk = /^((0[1-9])|(1[0-2]))\/\d{2}$/.test(exp);
    const cvcOk = /^\d{3,4}$/.test(cvc);
    const zipOk = zip.trim().length >= 3;
    const cardOk = card.replace(/\s/g, "").length >= 13; // not full Luhn, just min sanity
    return expOk && cvcOk && zipOk && cardOk;
  }, [card, exp, cvc, zip]);

  return (
    <SafeAreaView className="flex-1">
      {/* Backdrop */}
      <Pressable className="absolute inset-0 bg-black/40" onPress={() => router.back()} />

      {/* Sheet */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="absolute left-0 right-0 bottom-0 px-4 pb-6"
      >
        <View className="bg-white rounded-t-md border border-black/10 shadow-sm px-5 py-3.5">
          {/* Grabber */}
          <View className="items-center mb-2">
            <View className="w-16 h-[5px] bg-black/80 rounded-full" />
          </View>

          {/* Title */}
          <Text className="text-center text-xl text-slate-900 mb-3">Manual Payment</Text>

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
                onChangeText={(t) => setCvc(t.replace(/\D/g, "").slice(0, 4))}
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
                onChangeText={setZip}
                keyboardType="default"
                placeholder="12345"
                className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
              />
            </View>
          </View>

          {/* Confirm */}
          <Pressable
            disabled={!valid}
            onPress={() => {
              // TODO: send to your payment gateway tokenization (Stripe, Adyen, etc.)
              // Never handle raw card data yourself in production.
              router.dismiss();
              router.push({
                pathname: "/(tabs)/contact_info",
                params: {
                  amount: String(amount),
                  fundraiserName: String(fundraiserName),
                  fundName: String(fundName),
                  paymentMethod: "manual_card"
                }
              });
            }}
            className={[
              "h-11 mt-4 rounded-md items-center justify-center",
              valid ? "bg-blue-600" : "bg-blue-600/50",
            ].join(" ")}
            style={({ pressed }) => (pressed && valid ? { opacity: 0.9 } : undefined)}
          >
            <Text className="text-white text-base font-semibold">Confirm</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
