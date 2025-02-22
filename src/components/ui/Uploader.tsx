import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { ThemedText } from "./ThemedText";

interface UploaderProps {
  username: string;
  avatar: string;
}

const Uploader = ({ username, avatar }: UploaderProps) => {
  return (
    <Pressable style={styles.container}>
      <Avatar uri={avatar} size={40} />
      <ThemedText type="defaultSemiBold">{username}</ThemedText>
    </Pressable>
  );
};

export default Uploader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
