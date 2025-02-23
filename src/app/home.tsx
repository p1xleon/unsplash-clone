import { StyleSheet, StatusBar, ScrollView } from "react-native";
import React from "react";
import Tabs from "../components/Tabs";
import Header from "../components/Header";

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <Header />
      <Tabs />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
