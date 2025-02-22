import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";

interface MenuItemProps {
  title: string;
  onPress?: () => void;
}

const MenuItem = ({ title, onPress }: MenuItemProps) => {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <ThemedText>{title}</ThemedText>
    </Pressable>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
