import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View>
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  )
}

export const SmallLoader = () => {
  return (
    <View>
      <ActivityIndicator size={'small'} color={'#ffffff'} />
    </View>
  )
}

export default Loader


const styles = StyleSheet.create({})