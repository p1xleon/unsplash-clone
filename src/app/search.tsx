import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { searchPhotos } from "../services/api/unsplash/unsplash";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Loader from "../components/ui/Loader";
import ImageCard from "../components/ImageCard";
import { router } from "expo-router";
const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<UnsplashImage[]>([]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const results: UnsplashImage[] = await searchPhotos(query);
      setPhotos(results);
    } catch (error) {
      //   console.log("Error searching for photos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Pressable onPress={() => router.replace("/home")}>
            <Icon name="arrow-left" size={28} color="#292929" style={styles.icon} />
          </Pressable>
          <TextInput
            placeholder="Search images"
            placeholderTextColor="gray"
            style={styles.input}
            returnKeyType="search"
            value={query}
            onChangeText={setQuery}
            onEndEditing={handleSearch}
          />
        </View>
        <Pressable onPress={handleSearch}>
          <Icon name="magnify" size={24} color="#292929" style={styles.searchIcon} />
        </Pressable>
      </View>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={photos}
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
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={3}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d8d8d8",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    color: "#000000",
  },
  title: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 15,
    borderRadius: 500,
    backgroundColor: "#c7c7c7",
    padding: 10,
  },
});
