import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { ThemedText } from "./ThemedText";

interface UploaderProps {
  username?: string;
  avatar?: string;
  onPress?: () => void;
}

const Uploader = ({ username, avatar, onPress }: UploaderProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Avatar uri={avatar || "https://picsum.photos/40/40"} size={40} />
      <ThemedText type="defaultSemiBold">{username}</ThemedText>
    </Pressable>
  );
};

export default Uploader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
