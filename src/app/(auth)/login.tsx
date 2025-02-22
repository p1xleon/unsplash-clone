import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { Link } from "expo-router";
import { ThemedText } from "../../components/ui/ThemedText";
import Button from "../../components/ui/Button";
import TxtIpnut from "../../components/ui/TxtIpnut";
import { useDispatch } from "react-redux";
import { logIn } from "../../services/auth/firebase";
import { setUser } from "../../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const user = await logIn(email, password);
      dispatch(setUser(user));
    } catch (error: any) {
      Alert.alert("Something went wrong", error.message);
    }
  };

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
        <TxtIpnut label="Email" value="email" onChangeText={setEmail} />
        <TxtIpnut label="Password" value="password" onChangeText={setPassword} />
      </View>

      <Button title="Login" color={"#000"} onPress={handleLogin} />

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
