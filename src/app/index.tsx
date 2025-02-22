import { StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      {/* <SignupScreen /> */}
      {/* <Login /> */}
      <ImageCard />
      {/* <Photo /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
