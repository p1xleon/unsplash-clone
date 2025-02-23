import React from "react";
import { View, Modal, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MenuItem from "./ui/MenuItem";
import { ThemedText } from "./ui/ThemedText";
import { router } from "expo-router";
import { logout } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../services/firebase";
import { RootState } from "../store/store";

interface UserMenuProps {
  visible: boolean;
  onClose: () => void;
}

const UserMenu = ({ visible, onClose }: UserMenuProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logOut();
      dispatch(logout());
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("Failed to logout", error.message);
    }
  };
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.menu}>
        {/* items */}
        <MenuItem title="Notifications" />
        <MenuItem
          title="View Profile"
          onPress={() => (user ? router.push("/profile") : router.push("/login"))}
        />
        <MenuItem title="Stats" />
        <MenuItem title="Download History" />
        <MenuItem title="Account Settings" />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <ThemedText style={styles.submitText}>Submit an image</ThemedText>
        </TouchableOpacity>
        <MenuItem title={user ? "Logout" : "Login"} onPress={handleLogout} />
      </View>
    </Modal>
  );
};

export default UserMenu;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 50,
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    elevation: 12,
    borderWidth: 0.5,
  },
  submitButton: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
