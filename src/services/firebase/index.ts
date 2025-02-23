import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { auth, db } from "../../configs/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  userName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: userName });

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      firstName,
      lastName,
      userName,
      likedPhotos: [],
    });

    // to prevent redux from throwing serialzable error
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: userName,
      firstName,
      lastName,
    };

    await AsyncStorage.setItem("user", JSON.stringify(userData));
    return userData;
  } catch (error) {
    throw error;
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // to prevent redux from throwing serialzable error
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
    };

    await AsyncStorage.setItem("user", JSON.stringify(userData));
    return userData;
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

export const getCurrentUser = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

export const addLikedPhoto = async (userId: string, photo: LikedPhoto) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      likedPhotos: arrayUnion(photo),
    });
  } catch (error) {
    throw error;
  }
};

export const removeLikedPhoto = async (userId: string, photo: LikedPhoto) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      likedPhotos: arrayRemove(photo),
    });
  } catch (error) {
    throw error;
  }
};

export const checkLikedPhoto = async (userId: string, photoId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const likedPhotos = userSnap.data().likedPhotos || [];
      return likedPhotos.some((photo: LikedPhoto) => photo.id === photoId);
    }
    return false;
  } catch (error) {
    // console.error("Error checking liked photos", error);
    return false;
  }
};

export const fetchLikedPhotos = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().likedPhotos || [];
    } else return [];
  } catch (error) {
    // console.error("Could not get retrieve liked photos", error);
    return [];
  }
};
