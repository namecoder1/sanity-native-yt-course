import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const tint = isDark ? "#fff" : "#111";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tint,
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          height: 64,
          paddingVertical: 100,
          backgroundColor: isDark ? "#0f0f0f" : "#fff",
          borderTopColor: isDark ? "#1f1f1f" : "#e5e5e5",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="posts/index"
        options={{
          title: "Post",
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
