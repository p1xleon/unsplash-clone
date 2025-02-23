import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "../components/ui/Avatar";
import { ThemedText } from "../components/ui/ThemedText";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import IconButton from "../components/ui/IconButton";
import ImageCard from "../components/ImageCard";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchLikedPhotos } from "../services/firebase";
import { fetchUserPhotos } from "../services/api/unsplash/unsplash";
import Loader from "../components/ui/Loader";
import Header from "../components/Header";

const Profile = () => {
  const { userName, userAvatar, displayName } = useLocalSearchParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const [photos, setPhotos] = useState();
  const [loading, setLoading] = useState(true);
  const currentUser = !userName;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (currentUser && user) {
          const likedPhotos = await fetchLikedPhotos(user.uid);
          setPhotos(likedPhotos);
        } else if (userName) {
          const unsplashPhotos = await fetchUserPhotos(userName as string);
          setPhotos(unsplashPhotos);
        }
      } catch (error) {
        // console.log("Could not fetch photos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [userName, currentUser]);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.padding}>
        {userAvatar ? (
          <Avatar uri={userAvatar as string} size={120} />
        ) : (
          <Icon
            name="account-circle"
            size={150}
            color="#d8d8d8"
            style={{ marginLeft: -15, marginBottom: -15 }}
          />
        )}
      </View>
      <View style={styles.padding}>
        <ThemedText type="title">{currentUser ? user?.displayName : displayName || ""}</ThemedText>
        <View style={styles.profileActions}>
          <IconButton iconName="plus" />
          <IconButton iconName="email" />
          <IconButton iconName="dots-horizontal" />
        </View>
        <ThemedText>
          Download free, beautiful high-quality photos curated by{" "}
          {currentUser ? user?.displayName : displayName}{" "}
        </ThemedText>
        {currentUser ? (
          <View style={styles.profileActions}>
            <Icon name="check-circle" color={"dodgerblue"} size={18} />
            <ThemedText type="link">Available for Hire</ThemedText>
          </View>
        ) : (
          ""
        )}
      </View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <ThemedText type="subtitle" style={styles.padding}>
            {currentUser ? "Liked Photos" : "Photos"}
          </ThemedText>
          <FlatList
            data={photos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ImageCard
                displayName={currentUser ? item.userName : (displayName as string)}
                imageUrl={currentUser ? item.url : item.urls.regular}
                photoId={item.id}
                userName={currentUser ? item.userName : item.username}
                avatar={currentUser ? item.userAvatar : userAvatar}
              />
            )}
            scrollEnabled={false}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileActions: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  padding: {
    padding: 15,
  },
});
