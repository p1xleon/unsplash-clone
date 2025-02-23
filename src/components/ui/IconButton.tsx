import { Pressable, StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
    iconName: keyof typeof Icon.glyphMap;
    onPress?: () => void;
    isLiked?: boolean;
}

const IconButton = ({ iconName, onPress, isLiked }: IconButtonProps) => {
  return (
    <Pressable style={[styles.container, {backgroundColor: isLiked ? '#ff4646' : '#fff'}]} onPress={onPress}>
        <Icon name={iconName} size={22} color={isLiked ? '#ffffff' : '#7a7a7a'}/>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 8,
        elevation: 1,
    }
})