import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "./ui/ThemedText";
import { fetchPhotos, fetchTopicImages } from "../services/api/unsplash/unsplash";
import Loader from "./ui/Loader";
import ImageCard from "./ImageCard";

const categories = [
  { id: "photos", title: "Photos" },
  { id: "wallpapers", title: "Wallpapers" },
  { id: "nature", title: "Nature" },
  { id: "3d-renders", title: "3D Renders" },
  { id: "textures-patterns", title: "Texttures" },
  { id: "architecture-interior", title: "Architecture & Interiors" },
  { id: "travel", title: "Travel" },
  { id: "film", title: "Film" },
  { id: "street-photography", title: "Street Photography" },
  { id: "animals", title: "Animals" },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const data = activeTab === "photos" ? await fetchPhotos() : await fetchTopicImages(activeTab);
      setImages(data);
      setLoading(false);
    };
    loadImages();
  }, [activeTab]);

  return (
    <View>
      <View style={styles.container}>
        {/* Tabs */}
        <FlatList
          data={categories}
          horizontal
          initialNumToRender={3}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => setActiveTab(item.id)} style={styles.tab}>
              <ThemedText style={activeTab === item.id && styles.activeTab}>
                {item.title}
              </ThemedText>
            </Pressable>
          )}
          scrollEnabled={true}
        />
      </View>

      {/* Images */}
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageCard
              photoId={item.id}
              imageUrl={item.urls.regular}
              avatar={item.user.profile_image.medium}
              displayName={item.user.name}
              userName={item.user.username}
            />
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#aaaaaa",
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 2.5,
    paddingBottom: 15,
    color: "#000",
    fontWeight: "bold",
  },
});
