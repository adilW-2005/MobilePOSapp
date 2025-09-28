import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ModalBackdrop, BottomSheet } from "./components";

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

  const handleConfirm = () => {
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
  };

  return (
    <SafeAreaView className="flex-1">
      <ModalBackdrop />

      {/* Sheet */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="absolute left-0 right-0 bottom-0 px-4 pb-6"
      >
        <BottomSheet
          card={card}
          onChangeCard={onChangeCard}
          exp={exp}
          onChangeExp={onChangeExp}
          cvc={cvc}
          onChangeCvc={(t) => setCvc(t.replace(/\D/g, "").slice(0, 4))}
          zip={zip}
          onChangeZip={setZip}
          valid={valid}
          onConfirm={handleConfirm}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
