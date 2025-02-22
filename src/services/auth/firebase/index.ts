import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { auth } from "../../../configs/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem("user");
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};
