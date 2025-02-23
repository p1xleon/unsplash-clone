import React from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import MenuItem from "./ui/MenuItem";
import MenuDropdown from "./MenuDropdown";
import { ThemedText } from "./ui/ThemedText";

interface MenuProps {
  visible: boolean;
  onClose: () => void;
}

const Menu = ({ visible, onClose }: MenuProps) => {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View style={styles.menu}>
        {/* sections with items */}
        <MenuDropdown title="Company" iconName="home-city-outline">
          <MenuItem title="About" />
          <MenuItem title="Advertise" />
          <MenuItem title="History" />
          <MenuItem title="Join the team" />
          <MenuItem title="Blog" />
          <MenuItem title="Press" />
          <MenuItem title="Contact us" />
          <MenuItem title="Help Center" />
        </MenuDropdown>

        <MenuDropdown title="Product" iconName="cards-outline">
          <MenuItem title="Get Unsplash+" />
          <MenuItem title="Developers/API" />
          <MenuItem title="Unsplash Dataset" />
          <MenuItem title="Unsplash for iOS" />
          <MenuItem title="Apps & Plugins" />
          <MenuItem title="Unsplash Studio" />
        </MenuDropdown>

        <MenuDropdown title="Community" iconName="account-group-outline">
          <MenuItem title="Forum" />
          <MenuItem title="Developers" />
        </MenuDropdown>

        <MenuDropdown title="Legal" iconName="file-document-outline">
          <MenuItem title="Privacy Policy" />
          <MenuItem title="Terms of Service" />
        </MenuDropdown>

        <MenuDropdown title="English" iconName="translate">
          <MenuItem title="English" />
          <MenuItem title="Hindi" />
        </MenuDropdown>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <ThemedText style={styles.submitText}>Submit an image</ThemedText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Menu;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 10,
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
    marginTop: 20,
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
