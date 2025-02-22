import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { Link } from "expo-router";
import { ThemedText } from "../../components/ui/ThemedText";
import Button from "../../components/ui/Button";
import TxtIpnut from "../../components/ui/TxtIpnut";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <ThemedText type="title" style={styles.title}>
          Login
        </ThemedText>
        <Text style={styles.title}>Welcome back.</Text>
      </View>

      <Button title="Login with Facebook" color={"#0080ff"} />

      <ThemedText style={styles.title}>OR</ThemedText>

      <View>
        <TxtIpnut label="Email"></TxtIpnut>
        <TxtIpnut label="Password"></TxtIpnut>
      </View>

      <Button title="Login" color={"#000"} />

      <View style={styles.footer}>
        <ThemedText>
          Dont have an account? <Link href={"/signup"}>Join</Link>
        </ThemedText>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  footer: {
    paddingVertical: 40,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: "center",
  },
});
