import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import SearchBar from "./ui/SearchBar";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Menu from "./Menu";
import UserMenu from "./UserMenu";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [menuVisible, setMenuVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Logo */}
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/5968/5968749.png" }}
          style={styles.logo}
        />
      </TouchableOpacity>

      {/* Search BAr */}
      <View style={styles.searcContainer}>
        <SearchBar />
      </View>

      {/* Account and menu */}
      <TouchableOpacity onPress={() => setUserMenuVisible(true)}>
        <Icon name="account-circle" size={44} color="#d8d8d8" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Icon name="menu" size={30} color="#303030" />
      </TouchableOpacity>
      <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <UserMenu visible={userMenuVisible} onClose={() => setUserMenuVisible(false)} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 25,
    paddingTop: 10,
    marginTop: StatusBar.currentHeight,
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
