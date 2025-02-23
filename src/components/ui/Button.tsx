import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { ThemedText } from "./ThemedText";

interface ButtonProps {
  title: string | ReactNode;
  iconName?: string;
  color: string;
  onPress?: () => void;
  disabled?: boolean
}

const Button = ({ title, iconName, color, onPress, disabled }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={onPress}>
      <ThemedText style={styles.title}>{title}</ThemedText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 5,
    marginVertical: 20,
  },
  title: {
    color: "#fff",
    textAlign: 'center'
  },
});
