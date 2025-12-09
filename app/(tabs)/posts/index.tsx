import { useEffect, useState } from "react";
import { Image, ScrollView, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { client } from "@/sanity/client";
import { getPosts } from "@/sanity/queries";
import { Post } from "@/lib/types";
import { Button } from "@/components/ui/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch<Post[]>(getPosts);
        setPosts(data ?? []);
      } catch (err) {
        console.error("Errore nel fetch dei post:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background min-h-screen" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
      >
        <Text className="text-foreground text-2xl font-semibold mb-4">Tutti i post</Text>
        <View className="flex gap-4">
          {posts.length === 0 ? (
            <Text className="text-muted-foreground">Nessun post trovato.</Text>
          ) : (
            posts.map((post) => (
              <View key={post.id} className="border border-border rounded-xl bg-card overflow-hidden">
                {post.image ? <Image source={{ uri: post.image }} className="w-full h-52" /> : null}
                <View className="p-4 gap-2">
                  <Text className="text-foreground text-xl font-semibold">{post.title}</Text>
                  {post.excerpt ? (
                    <Text className="text-muted-foreground leading-relaxed">{post.excerpt}</Text>
                  ) : null}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-muted-foreground text-sm">
                      {[post.author, post.category].filter(Boolean).join(" • ")}
                    </Text>
                    <Button
                      onPress={() =>
                        router.push({ pathname: "/[id]", params: { id: post.id?.toString() } })
                      }
                      variant="outline"
                    >
                      <AntDesign name="read" size={16} color={colorScheme === "dark" ? "#fff" : "#333"} />
                      <Text className="text-foreground ml-2">Apri</Text>
                    </Button>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Posts;
