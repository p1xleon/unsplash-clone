import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ThemedText } from "../../components/ui/ThemedText";
import Button from "../../components/ui/Button";
import { useDispatch } from "react-redux";
import { logIn } from "../../services/firebase";
import { setUser } from "../../store/slices/authSlice";
import Header from "../../components/Header";
import { SmallLoader } from "../../components/ui/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });

  const dispatch = useDispatch();

  const validateInputs = () => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
      }
    }

    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" })); // Clear previous errors

    try {
      const user = await logIn(email.trim(), password);
      dispatch(setUser(user));
      router.replace("/home");
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, general: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header />
        <View>
          <ThemedText type="title" style={styles.title}>
            Login
          </ThemedText>
          <ThemedText style={styles.title}>Welcome back.</ThemedText>
        </View>

        <View style={styles.padding}>
        <ThemedText>Email</ThemedText>
          <View style={[styles.inputContainer, errors.email && styles.inputError]}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email && <ThemedText style={styles.errorText}>{errors.email}</ThemedText>}

          <ThemedText>Password</ThemedText>
          <View style={[styles.inputContainer, errors.password && styles.inputError]}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          {errors.password && <ThemedText style={styles.errorText}>{errors.password}</ThemedText>}
        </View>

        {errors.general && <ThemedText style={styles.errorText}>{errors.general}</ThemedText>}

        <View style={styles.padding}>
          <Button
            title={isLoading ? <SmallLoader /> : "Login"}
            color={"#000"}
            onPress={handleLogin}
            disabled={isLoading}
          />
        </View>

        <View style={styles.footer}>
          <ThemedText>
            Don't have an account?{" "}
            <ThemedText style={styles.joinText} onPress={() => router.replace("/signup")}>
              Join
            </ThemedText>
          </ThemedText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
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
  joinText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  padding: {
    paddingHorizontal: 15,
  },
  inputContainer: {
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  inputError: {
    borderBottomColor: "red",
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  togglePassword: {
    paddingHorizontal: 10,
    color: "#007BFF",
  },
});
