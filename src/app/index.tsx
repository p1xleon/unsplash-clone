import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <>
      <StatusBar style="auto" />
      <Redirect href="/home" />
    </>
  );
}
