import React from "react";
import { View, Text, TextInput } from "react-native";
import { Checkbox } from "./Checkbox";

interface ContactFormProps {
  first: string;
  setFirst: (value: string) => void;
  last: string;
  setLast: (value: string) => void;
  organization: string;
  setOrganization: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  hideName: boolean;
  setHideName: (value: boolean) => void;
  allowContact: boolean;
  setAllowContact: (value: boolean) => void;
  orgName: string;
}

export function ContactForm({
  first,
  setFirst,
  last,
  setLast,
  organization,
  setOrganization,
  email,
  setEmail,
  phone,
  setPhone,
  hideName,
  setHideName,
  allowContact,
  setAllowContact,
  orgName,
}: ContactFormProps) {
  return (
    <>
      {/* Name row */}
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-2">First Name</Text>
          <TextInput
            value={first}
            onChangeText={setFirst}
            placeholder=""
            className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-3 text-base text-slate-900"
          />
        </View>
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-2">Last Name</Text>
          <TextInput
            value={last}
            onChangeText={setLast}
            placeholder=""
            className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-3 text-base text-slate-900"
          />
        </View>
      </View>

      {/* Organization */}
      <View className="mt-4">
        <Text className="text-base text-slate-900 mb-2">Organization Name</Text>
        <TextInput
          value={organization}
          onChangeText={setOrganization}
          placeholder=""
          className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-3 text-base text-slate-900"
        />
      </View>

      {/* Hide name */}
      <View className="mt-4 flex-row items-center gap-2">
        <Checkbox checked={hideName} onToggle={() => setHideName(!hideName)} />
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
            placeholder=""
            className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-3 text-base text-slate-900"
          />
        </View>
        <View className="flex-1">
          <Text className="text-base text-slate-900 mb-2">Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder=""
            className="bg-white border border-black/10 rounded-lg shadow-sm px-3 py-3 text-base text-slate-900"
          />
        </View>
      </View>

      {/* Allow contact */}
      <View className="mt-4 flex-row items-center gap-2">
        <Checkbox
          checked={allowContact}
          onToggle={() => setAllowContact(!allowContact)}
        />
        <Text className="text-base text-slate-900">
          Allow {orgName} to contact me
        </Text>
      </View>
    </>
  );
} 