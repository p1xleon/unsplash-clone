import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

interface AvatarProps {
  size?: number;
  uri: string;
}

const Avatar = ({ size, uri }: AvatarProps) => {
  return (
    <View>
      <Image source={{ uri: uri }} style={[styles.avatar, { height: size, width: size }]} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 25,
    marginRight: 10,
  },
});
