import { StyleSheet, Text, View, TextInput, TextInputProps } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

interface InputProps extends TextInputProps {
  label?: string;
}

const TxtIpnut = ({ label, style, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <ThemedText>{label}</ThemedText>}
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

export default TxtIpnut;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});
