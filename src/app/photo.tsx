import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import PhotoActions from "../components/PhotoActions";
import Uploader from "../components/ui/Uploader";
import IconButton from "../components/ui/IconButton";
import { ThemedText } from "../components/ui/ThemedText";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Tag from "../components/ui/Tag";
import { router, useLocalSearchParams } from "expo-router";
import Header from "../components/Header";
import { fetchPhotoDetails } from "../services/api/unsplash/unsplash";
import Loader from "../components/ui/Loader";

const Photo = () => {
  // const { imageUrl, avatar, username, displayName } = useLocalSearchParams(); //get image details from router params, no need to fetch from api
  const { photoId } = useLocalSearchParams(); //fetch id from router params, needs to fetch photo from api
  const [photoDetails, setPhotoDetails] = useState<UnsplashImage>();
  useEffect(() => {
    const loadPhotoDetails = async () => {
      if (!photoId) return;
      const data = await fetchPhotoDetails(photoId as string);
      setPhotoDetails(data);
    };
    loadPhotoDetails();
  }, [photoId]);

  const handleShare = async () => {
    try {
      await Linking.openURL(photoDetails?.links.html || "");
    } catch (error) {
      console.log("Error downloading image", error);
      Alert.alert("Could not share image", "Please try again later");
    }
  };

  if (!photoDetails) return <Loader />;

  const photo: LikedPhoto = {
    id: photoDetails.id,
    url: photoDetails.urls.regular,
    userName: photoDetails.user.username,
    userAvatar: photoDetails.user.profile_image.medium,
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Uploader
        avatar={photoDetails.user.profile_image.medium}
        username={photoDetails.user.name}
        onPress={() =>
          router.push({
            pathname: "/profile",
            params: {
              userName: photoDetails.user.username,
              userAvatar: photoDetails.user.profile_image.medium,
              displayName: photoDetails.user.name,
            },
          })
        }
      />
      <View>
        <PhotoActions photo={photo} donwloadUrl={photoDetails.links.download} />
        <Image
          source={{
            uri: photoDetails.urls.raw,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.padding}>
        <View style={styles.iconsContainer}>
          <IconButton iconName="share" onPress={handleShare} />
          <IconButton iconName="dots-horizontal" />
        </View>
        {photoDetails.downloads && (
          <View>
            <ThemedText>Downloads</ThemedText>
            <ThemedText type="defaultSemiBold">{photoDetails.downloads}</ThemedText>
          </View>
        )}
        {photoDetails.description ? <ThemedText style={styles.verticalMargin}>{photoDetails.description}</ThemedText> : null}
        <View style={styles.photoDetails}>
          <View>
            <View style={styles.photoDetails}>
              <Icon name="calendar-blank-outline" style={styles.infoIcon} />
              <ThemedText>
                Published on {new Date(photoDetails.created_at).toDateString() || ""}
              </ThemedText>
            </View>
            <View style={styles.photoDetails}>
              <Icon name="map-marker-outline" style={styles.infoIcon} />
              <ThemedText>
                {photoDetails.location.city || ""} {photoDetails.location.country || ""}
              </ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          {photoDetails.tags.map((tag) => (
            <Tag key={tag.title} name={tag.title} />
          ))}
        </View>
        <View style={styles.verticalMargin}>
          <ThemedText type="subtitle">Related Images</ThemedText>
        </View>
        <FlatList
          data={photoDetails.related_collections?.results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.relatedContainer}>
              {item.cover_photo?.urls?.regular && (
                <Image
                  source={{ uri: item.cover_photo.urls.regular }}
                  style={styles.relatedImage}
                />
              )}
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  iconsContainer: {
    marginTop: 15,
    marginBottom: 30,
    flexDirection: "row",
    gap: 10,
  },
  photoDetails: {
    flexDirection: "row",
    marginBottom: 5,
  },
  padding: {
    paddingHorizontal: 15,
  },
  infoIcon: {
    fontSize: 22,
    color: "#8f8f8f",
    marginRight: 10,
  },
  tagsContainer: {
    marginVertical: 15,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  verticalMargin: {
    marginVertical: 20,
  },
  relatedContainer: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 10,
  },
  relatedImage: {
    width: "100%",
    height: "100%",
  },
});
