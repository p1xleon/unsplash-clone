import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return (
    <Pressable style={styles.container}>
      <Text>{name}</Text>
    </Pressable>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: "#e2e2e2",
  },
});
