import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', // bg-gray-100 equivalent
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb', // text-blue-600 equivalent
    marginBottom: 16,
  },
  subtitle: {
    color: '#6b7280', // text-gray-600 equivalent
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#3b82f6', // bg-blue-500 equivalent
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome to Mobile POS App
      </Text>
      <Text style={styles.subtitle}>
        Styled with React Native StyleSheet
      </Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          Beautiful Native Styling
        </Text>
      </View>
    </View>
  );
}
