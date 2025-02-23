import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { ThemedText } from "../../components/ui/ThemedText";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { signUp } from "../../services/firebase";
import { setUser } from "../../store/slices/authSlice";
import Button from "../../components/ui/Button";
import { SmallLoader } from "../../components/ui/Loader";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    general: "",
  });

  const dispatch = useDispatch();

  const validateInputs = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      general: "",
    };
    let isValid = true;

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = "Please enter a valid email.";
        isValid = false;
      }
    }
    if (!userName.trim()) {
      newErrors.userName = "Username is required.";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      const user = await signUp(
        email.trim(),
        password,
        firstName.trim(),
        lastName.trim(),
        userName.trim()
      );
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
      <ScrollView style={styles.container}>
        <ImageBackground source={{ uri: "https://picsum.photos/1920" }} style={styles.header}>
          <View style={styles.overlay} />
          <ThemedText type="title" style={styles.headerText}>
            Creation starts here
          </ThemedText>
          <ThemedText style={styles.headerText}>
            Access millions of free, high-resolution photos you can’t find anywhere else.
          </ThemedText>
        </ImageBackground>

        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Join Unsplash</ThemedText>
            <ThemedText>
              Already have an account?{" "}
              <ThemedText style={styles.loginText} onPress={() => router.replace("/login")}>
                Login
              </ThemedText>
            </ThemedText>
          </View>

          <View>
            <ThemedText>First Name</ThemedText>
            <View style={[styles.inputContainer, errors.firstName && styles.inputError]}>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            {errors.firstName && (
              <ThemedText style={styles.errorText}>{errors.firstName}</ThemedText>
            )}

            <ThemedText>Last Name</ThemedText>
            <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            {errors.lastName && <ThemedText style={styles.errorText}>{errors.lastName}</ThemedText>}

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

            <ThemedText>Username</ThemedText>
            <View style={[styles.inputContainer, errors.userName && styles.inputError]}>
              <TextInput
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
              />
            </View>
            {errors.userName && <ThemedText style={styles.errorText}>{errors.userName}</ThemedText>}

            <ThemedText>Password (min. 8 char)</ThemedText>
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

          <Button
            title={isLoading ? <SmallLoader /> : "Join"}
            color="#000"
            onPress={handleSignUp}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  header: {
    width: "100%",
    height: 180,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  headerText: {
    color: "#fff",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  titleContainer: {
    marginVertical: 25,
    alignItems: "center",
  },
  form: {
    paddingHorizontal: 15,
  },
  loginText: {
    textDecorationLine: "underline",
    fontWeight: "bold",
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
