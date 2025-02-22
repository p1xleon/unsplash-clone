import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

interface ButtonProps {
  title: string;
  iconName?: string;
  color: string;
}

const Button = ({ title, iconName, color }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }]}>
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
