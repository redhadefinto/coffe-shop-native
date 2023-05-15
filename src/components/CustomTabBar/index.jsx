import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
// import {COLORS} from '../constants';

const CustomTabBar = props => {
  return (
    <View>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: 'relative',
    right: 10,
    left: 10,
    bottom: 38,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  containerIconPencil: {
    width: 50,
    height: 50,
    backgroundColor: '#6A4029',
    position: 'absolute',
    borderRadius: 10000,
    // right: 0,
    top: -130,
    right: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
