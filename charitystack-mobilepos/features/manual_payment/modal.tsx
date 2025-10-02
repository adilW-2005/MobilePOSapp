import React, { useMemo, useState } from "react";
import { View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { BottomSheet } from "./components";

interface ManualPaymentModalProps {
  visible: boolean;
  amount?: string;
  fundraiserName?: string;
  fundName?: string;
  onConfirm: (paymentData: {
    card: string;
    exp: string;
    cvc: string;
    zip: string;
  }) => void;
  onClose: () => void;
}

export function ManualPaymentModal({
  visible,
  amount,
  fundraiserName,
  fundName,
  onConfirm,
  onClose,
}: ManualPaymentModalProps) {
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");

  // Reset form when modal opens
  React.useEffect(() => {
    if (visible) {
      setCard("");
      setExp("");
      setCvc("");
      setZip("");
    }
  }, [visible]);

  // Input helpers
  function onChangeCard(t: string) {
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
    const cardOk = card.replace(/\s/g, "").length >= 13;
    return expOk && cvcOk && zipOk && cardOk;
  }, [card, exp, cvc, zip]);

  const handleConfirm = () => {
    if (valid) {
      onConfirm({ card, exp, cvc, zip });
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <View className="absolute inset-0 z-50">
      {/* Backdrop */}
      <Pressable
        className="absolute inset-0 bg-black/40"
        onPress={onClose}
      />
      
      {/* Modal Content */}
      <View className="flex-1 justify-end">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
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
      </View>
    </View>
  );
} 