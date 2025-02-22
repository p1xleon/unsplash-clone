import { StyleSheet, Image, View } from "react-native";
import React from "react";
import PhotoActions from "../components/PhotoActions";
import Uploader from "../components/ui/Uploader";
import IconButton from "../components/ui/IconButton";
import { ThemedText } from "../components/ui/ThemedText";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Tag from "../components/ui/Tag";

const Photo = () => {
  return (
      <View style={styles.container}>
        <Uploader avatar="https://picsum.photos/536/354" username="p1xle" />
        <View>
          <PhotoActions />
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1730839241989-d60cdef3fcba?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.iconsContainer}>
          <IconButton iconName="share" />
          <IconButton iconName="dots-horizontal" />
        </View>
        <View style={styles.photoDetails}>
          <View>
            <View style={styles.photoDetails}>
              <Icon name="calendar-blank-outline" style={styles.infoIcon} />
              <ThemedText>Published on November 12, 2024</ThemedText>
            </View>
            <View style={styles.photoDetails}>
              <Icon name="shield-check-outline" style={styles.infoIcon} />
              <ThemedText>Licensed under Unsplash+ Licence</ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          <Tag name="Render" />
          <Tag name="Colorful" />
        </View>
        <View style={styles.related}>
            <ThemedText type="subtitle">Related Images</ThemedText>
        </View>
      </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  iconsContainer: {
    marginTop: 15,
    marginBottom: 30,
    paddingHorizontal: 15,
    flexDirection: "row",
    gap: 10,
  },
  photoDetails: {
    flexDirection: "row",
    paddingHorizontal: 7,
    marginBottom: 5,
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
    paddingHorizontal: 15,
  },
  related: {
    marginVertical: 20,
    paddingHorizontal: 15
  }
});
