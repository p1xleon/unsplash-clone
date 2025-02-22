import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Alert, ScrollView } from "react-native";
import { ThemedText } from "../../components/ui/ThemedText";
import TxtIpnut from "../../components/ui/TxtIpnut";
import { Link } from "expo-router";
import { useDispatch } from "react-redux";
import { signUp } from "../../services/auth/firebase";
import { setUser } from "../../store/slices/authSlice";
import Button from "../../components/ui/Button";


const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const user = await signUp(email, password);
      dispatch(setUser(user));
    } catch (error: any) {
      Alert.alert('Something went wrong while signin up', error.message)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: "https://picsum.photos/1920" }} style={styles.header}>
        <View style={styles.overlay} />
        <ThemedText type="title" style={styles.headerText}>
          Creation starts here
        </ThemedText>
        <Text style={styles.headerText}>
          Access millions of free, high-resolution photos you can’t find anywhere else.
        </Text>
      </ImageBackground>

      <View style={styles.form}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Join Unsplash</ThemedText>
          <ThemedText>
            Already have an account? <Link href="/login">Login</Link>
          </ThemedText>
        </View>

        <View>
          <TxtIpnut label="First Name" onChangeText={setFirstName} />
          <TxtIpnut label="Last Name" onChangeText={setLastName} />
          <TxtIpnut label="Email" onChangeText={setEmail} />
          <TxtIpnut label="Username (only letters, numbers and underscores" onChangeText={setUsername} />
          <TxtIpnut label="Password (min. 8 char)" onChangeText={setPassword} />
        </View>

        <Button title="Join" color="#000" onPress={handleSignUp} />
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10
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
    filter: "grayscale(100%)",
  },
  titleContainer: {
    marginVertical: 25,
    alignItems: "center",
  },
  form: {
    paddingHorizontal: 15,
  },
});
