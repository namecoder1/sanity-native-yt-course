import { useColorScheme } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="[id]" options={{ headerShown: true, title: "Dettaglio post" }} />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} animated />
      <PortalHost />
    </>
  );
}
