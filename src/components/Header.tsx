import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import SearchBar from "./ui/SearchBar";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Sidebar from "./Sidebar";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/128/5968/5968749.png" }}
        style={styles.logo}
      />

      {/* Search BAr */}
      <View style={styles.searcContainer}>
        <SearchBar />
      </View>

      {/* Account and menu */}
      <Icon name="account-circle" size={44} color="#d8d8d8" style={styles.icon} />
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Icon name="menu" size={30} color="#303030" />
      </TouchableOpacity>
      <Sidebar visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 40,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  searcContainer: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
});
