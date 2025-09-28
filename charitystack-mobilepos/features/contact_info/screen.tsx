import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

function Checkbox({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      className={[
        "w-5 h-5 rounded-[3px] border items-center justify-center",
        checked ? "bg-blue-600 border-blue-600" : "bg-white border-black/20",
      ].join(" ")}
    >
      {checked ? <Text className="text-white text-[12px]">✓</Text> : null}
    </Pressable>
  );
}

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

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
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
          {/* Name row */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-base text-slate-900 mb-2">First Name</Text>
              <TextInput
                value={first}
                onChangeText={setFirst}
                placeholder="First"
                className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
              />
            </View>
            <View className="flex-1">
              <Text className="text-base text-slate-900 mb-2">Last Name</Text>
              <TextInput
                value={last}
                onChangeText={setLast}
                placeholder="Last"
                className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
              />
            </View>
          </View>

          {/* Organization */}
          <View className="mt-4">
            <Text className="text-base text-slate-900 mb-2">Organization Name</Text>
            <TextInput
              value={organization}
              onChangeText={setOrganization}
              placeholder="Organization (optional)"
              className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
            />
          </View>

          {/* Hide name */}
          <View className="mt-4 flex-row items-center gap-2">
            <Checkbox checked={hideName} onToggle={() => setHideName((v) => !v)} />
            <Text className="text-base text-slate-900">
              Don't display my name anywhere publicly
            </Text>
          </View>

          {/* Email / Phone */}
          <View className="mt-4 flex-row gap-4">
            <View className="flex-1">
              <Text className="text-base text-slate-900 mb-2">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="name@example.com"
                className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
              />
            </View>
            <View className="flex-1">
              <Text className="text-base text-slate-900 mb-2">Phone Number</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="(555) 555-5555"
                className="bg-slate-100 border border-black/10 rounded-md px-3 py-2 text-base text-slate-900"
              />
            </View>
          </View>

          {/* Allow contact */}
          <View className="mt-4 flex-row items-center gap-2">
            <Checkbox
              checked={allowContact}
              onToggle={() => setAllowContact((v) => !v)}
            />
            <Text className="text-base text-slate-900">
              Allow {String(org)} to contact me
            </Text>
          </View>
        </ScrollView>

        {/* Confirm button */}
        <Pressable
          disabled={!canSubmit}
          onPress={() => {
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
          }}
          className={[
            "h-11 mx-4 mb-4 rounded-md items-center justify-center",
            canSubmit ? "bg-blue-600" : "bg-blue-600/50",
          ].join(" ")}
          style={({ pressed }) => (pressed && canSubmit ? { opacity: 0.9 } : undefined)}
        >
          <Text className="text-white text-base font-semibold">Confirm</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
