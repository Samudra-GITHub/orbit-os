import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orbit OS</Text>
      <Text style={styles.subtitle}>Your day, orchestrated.</Text>
      <Text style={styles.note}>Companion app — bundled with Metro.</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0f",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    color: "#a78bfa",
    fontSize: 14,
  },
  note: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 24,
  },
});
