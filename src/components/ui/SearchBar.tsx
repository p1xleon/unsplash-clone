import React from "react";
import { TextInput, View, StyleSheet, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { ThemedText } from "./ThemedText";

const SearchBar = () => {
  return (
    <Pressable style={styles.container} onPress={() => router.push("/search")}>
      <Icon name="magnify" size={24} color="gray" style={styles.icon} />
      <ThemedText type="secondarySemiBold" style={styles.bar}>
        Search
      </ThemedText>
    </Pressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 8,
  },
  bar: {
    padding: 8,
  },
});
