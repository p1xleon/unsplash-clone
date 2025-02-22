import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Uploader from "./ui/Uploader";
import PhotoActions from "./PhotoActions";
import { router } from "expo-router";

interface ImageCardProps {
  avatar: string;
}

const ImageCard = () => {
  return (
    <View style={styles.container}>
      <View>
        <Uploader avatar="https://picsum.photos/536/354" username="p1xle" />
        <View>
          <Pressable onPress={() => router.push('/photo')}>
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1730839241989-d60cdef3fcba?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
            }}
            style={styles.image}
            />
            </Pressable>
        </View>
        <PhotoActions />
      </View>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
