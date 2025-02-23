import { useEffect } from "react";
import { Stack } from "expo-router";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../store/slices/authSlice";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { auth } from "../configs/firebaseConfig";
import React from "react";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}

function MainLayout() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const serializedUser = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
        };
        dispatch(setUser(serializedUser));
        // console.log(serializedUser);
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        {!user && (
          <>
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/signup" />
          </>
        )}
      </Stack>
    </>
  );
}
