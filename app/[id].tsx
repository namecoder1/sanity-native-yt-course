import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import { client } from "@/sanity/client";
import { getPostById } from "@/sanity/queries";
import { Post } from "@/lib/types";
import { PortableText, PortableTextComponents } from "@portabletext/react-native";

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <Text className="text-3xl font-bold text-foreground mt-6">{children}</Text>,
    h2: ({ children }) => <Text className="text-2xl font-semibold text-foreground mt-5">{children}</Text>,
    h3: ({ children }) => <Text className="text-xl font-semibold text-foreground mt-4">{children}</Text>,
    normal: ({ children }) => (
      <Text className="text-base leading-relaxed text-muted-foreground mt-3">{children}</Text>
    ),
  },
  list: {
    bullet: ({ children }) => <View className="mt-3">{children}</View>,
    number: ({ children }) => <View className="mt-3">{children}</View>,
  },
  listItem: {
    bullet: ({ children }) => (
      <View className="flex-row items-start gap-2">
        <Text className="text-muted-foreground">•</Text>
        <Text className="text-muted-foreground flex-1 leading-relaxed">{children}</Text>
      </View>
    ),
    number: ({ children, index }) => (
      <View className="flex-row items-start gap-2">
        <Text className="text-muted-foreground">{index + 1}.</Text>
        <Text className="text-muted-foreground flex-1 leading-relaxed">{children}</Text>
      </View>
    ),
  },
};

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const postId = useMemo(() => {
    const value = Array.isArray(id) ? id[0] : id;
    return typeof value === "string" ? value : undefined;
  }, [id]);
  const isDark = useColorScheme() === "dark";
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setError("Nessun post selezionato.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const data = await client.fetch<Post | null>(getPostById, { id: postId });
        if (!data) {
          setError("Post non trovato.");
          return;
        }
        setPost(data);
      } catch (err) {
        setError("Errore durante il caricamento del post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const formattedDate = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: post?.title ?? "Dettaglio post",
          headerStyle: { backgroundColor: isDark ? "#0f0f0f" : "#fff" },
          headerTintColor: isDark ? "#fff" : "#111",
          headerTitleStyle: { color: isDark ? "#fff" : "#111" },
          headerBackTitle: "Indietro",
        }}
      />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-destructive text-center">{error}</Text>
        </View>
      ) : post ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 min-h-screen"
          contentContainerStyle={{ paddingBottom: 48 }}
        >
          {post.image ? (
            <Image source={{ uri: post.image }} className="w-full h-64" resizeMode="cover" />
          ) : null}

          <View className="px-4 py-6 gap-4">
            <View className="gap-2">
              <Text className="text-3xl font-bold text-foreground">{post.title}</Text>
              {(post.author || post.category || formattedDate) && (
                <Text className="text-muted-foreground">
                  {[post.author, post.category, formattedDate].filter(Boolean).join(" • ")}
                </Text>
              )}
            </View>

            {post.tags && post.tags.length > 0 ? (
              <View className="flex-row flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <View key={tag} className="rounded-full bg-muted px-3 py-1">
                    <Text className="text-xs font-semibold text-muted-foreground">#{tag}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {post.excerpt ? (
              <Text className="text-muted-foreground leading-relaxed">{post.excerpt}</Text>
            ) : null}

            <View className="prose mb-20">
              {post.text ? <PortableText value={post.text} components={portableTextComponents} /> : null}
            </View>
          </View>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}
