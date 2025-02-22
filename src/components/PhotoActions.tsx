import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./ui/ThemedText";
import IconButton from "./ui/IconButton";

const PhotoActions = () => {
  return (
    <View style={styles.actions}>
      <View style={styles.iconContainer}>
        <IconButton iconName="heart" />
        <IconButton iconName="plus" />
      </View>
      <Pressable style={styles.downloadButton}>
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
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
});
