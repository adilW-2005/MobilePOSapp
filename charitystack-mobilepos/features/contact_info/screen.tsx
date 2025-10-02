import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { ContactForm, ConfirmButton } from "./components";

export default function ContactInfo() {
  const { 
    org = "Nueces Mosque",
    amount,
    fundraiserName,
    fundName,
    paymentMethod
  } = useLocalSearchParams<{ 
    org?: string;
    amount?: string;
    fundraiserName?: string;
    fundName?: string;
    paymentMethod?: string;
  }>();

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hideName, setHideName] = useState(false);
  const [allowContact, setAllowContact] = useState(false);

  const canSubmit = first.trim().length > 0 && last.trim().length > 0;

  const handleConfirm = () => {
    const donationData = {
      donor: {
        first,
        last,
        organization,
        email,
        phone,
        hideName,
        allowContact,
      },
      donation: {
        amount,
        fundraiserName,
        fundName,
        paymentMethod
      }
    };
    console.log("Donation completed:", donationData);
    
    // Show success message and reset flow
    alert(`Thank you ${first}! Your donation of $${amount} to ${fundraiserName} - ${fundName} has been processed successfully.`);
    
    // Navigate back to start
    router.push("/(tabs)/select_fundraiser");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View className="px-4 pt-1 pb-2 items-center">
          <Text className="text-xl text-slate-900">Confirm Contact Information</Text>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        >
          <ContactForm
            first={first}
            setFirst={setFirst}
            last={last}
            setLast={setLast}
            organization={organization}
            setOrganization={setOrganization}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            hideName={hideName}
            setHideName={setHideName}
            allowContact={allowContact}
            setAllowContact={setAllowContact}
            orgName={String(org)}
          />
        </ScrollView>

        {/* Confirm button */}
        <ConfirmButton
          disabled={!canSubmit}
          onPress={handleConfirm}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
