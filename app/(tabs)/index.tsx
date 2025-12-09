import { Button } from "@/components/ui/button";
import { Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-background min-h-screen flex items-center justify-center" edges={["top", "bottom"]}>
      <View className="gap-2 mb-20 flex items-center justify-center px-6">
        <Text className="text-foreground text-5xl font-bold tracking-tighter">Sanity Native</Text>
        <Text className="text-muted-foreground text-center leading-relaxed text-lg tracking-tighter">
          Starter repo with Expo + React Native + Sanity to work with your Content Lake in every OS
        </Text>
        <Button variant='secondary' className="mt-4">
          <Ionicons name="play-outline" size={16} color={colorScheme == 'dark' ? '#fff' : '#333'} />
          <Text className="text-foreground">Guarda il tutorial</Text>
        </Button>
        
      </View>
    </SafeAreaView>
  );
}
