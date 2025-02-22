import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemedText } from "./ui/ThemedText";

interface MenuDropdownProps {
  title: string;
  children: React.ReactNode;
  iconName?: keyof typeof Icon.glyphMap;
}

const MenuDropdown = ({ title, children, iconName }: MenuDropdownProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <View>
      <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
        <View style={styles.leftContainer}>
          <Icon name={iconName} size={28} color="#272727" style={styles.typeIcon} />
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </View>
        <Icon name={expanded ? "chevron-up" : "chevron-down"} size={28} color="gray" />
      </Pressable>
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

export default MenuDropdown;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  typeIcon: {
    marginRight: 15,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    paddingLeft: 45,
  },
});
