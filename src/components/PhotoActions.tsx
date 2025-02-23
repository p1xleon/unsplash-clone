import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "./ui/ThemedText";
import IconButton from "./ui/IconButton";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import { addLikedPhoto, checkLikedPhoto, removeLikedPhoto } from "../services/firebase";

interface PhotoActionProps {
  photo: LikedPhoto;
  donwloadUrl?: string;
  shareUrl?: string;
}

const PhotoActions = ({ photo, donwloadUrl, shareUrl }: PhotoActionProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user) return;
    const checkLikesStatus = async () => {
      const liked = await checkLikedPhoto(user.uid, photo.id);
      setIsLiked(liked);
    };
    checkLikesStatus();
  }, [user, photo.id]);

  const toggleLikePhoto = async () => {
    if (!user) {
      router.push("login");
      return;
    }
    try {
      if (isLiked) {
        await removeLikedPhoto(user.uid, photo);
        setIsLiked(false);
      } else {
        await addLikedPhoto(user.uid, photo);
        setIsLiked(true);
      }
    } catch (error) {
      // console.error("Error liking photo", error);
    }
  };

  const handleDownload = async () => {
    try {
      await Linking.openURL(donwloadUrl || "");
    } catch (error) {
      // console.log("Error downloading image", error);
      Alert.alert("Could not donwload image", "Please try again later");
    }
  };

  return (
    <View style={styles.actions}>
      <View style={styles.iconContainer}>
        <IconButton iconName="heart" onPress={toggleLikePhoto} isLiked={isLiked} />
        <IconButton iconName="plus" />
      </View>
      <Pressable style={styles.downloadButton} onPress={handleDownload}>
        <ThemedText>Download</ThemedText>
      </Pressable>
    </View>
  );
};

export default PhotoActions;

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  downloadButton: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },
});
