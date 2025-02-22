import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface IconButtonProps {
    iconName: keyof typeof Icon.glyphMap;
}

const IconButton = ({ iconName }: IconButtonProps) => {
  return (
    <Pressable style={styles.container}>
        <Icon name={iconName} size={22}/>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 8,
    }
})