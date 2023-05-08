import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HumburgerPng from '../../assets/icon/humburger.png';
import shippingCartPng from '../../assets/icon/shopping-cart.png';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image} from 'react-native-svg';

const Navbar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={HumburgerPng} style={{width: 25, height: 25}} />
      </TouchableOpacity>
      <View>
        <Image source={shippingCartPng} style={{width: 40, height: 40}} />
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    borderColor: 'black',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingRight: 40,
  },
});
