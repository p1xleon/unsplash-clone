import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Uploader from "./ui/Uploader";
import PhotoActions from "./PhotoActions";
import { router } from "expo-router";

interface ImageCardProps {
  avatar?: string;
  imageUrl: string;
  displayName: string;
  userName: string;
  photoId: string;
}

const ImageCard = ({ avatar, imageUrl, displayName, userName, photoId }: ImageCardProps) => {
  const photo: LikedPhoto = { id: photoId, url: imageUrl, userName: userName, userAvatar: avatar };
  return (
    <View style={styles.container}>
      <View>
        <Uploader avatar={avatar} username={displayName} />
        <View>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/photo",
                // params: { imageUrl, displayName, avatar, userName },
                params: { photoId },
              })
            }>
            <Image
              source={{
                uri: imageUrl || "https://picsum.photos/400/600",
              }}
              style={styles.image}
            />
          </Pressable>
        </View>
        <PhotoActions photo={photo} donwloadUrl={imageUrl} />
      </View>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
