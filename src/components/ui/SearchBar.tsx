import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Icon name="magnify" size={24} color="gray" style={styles.icon} />
      <TextInput placeholder="Search images" placeholderTextColor="gray" style={styles.input} />
    </View>
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
  input: {
    fontSize: 16,
    color: "#000000",
  },
});
