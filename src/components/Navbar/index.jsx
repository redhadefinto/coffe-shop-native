import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HumburgerPng from '../../assets/icon/humburger.png';
import shippingCartPng from '../../assets/icon/cart_inactive.png';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {Image} from 'react-native-svg';
import manage from '../../assets/icon/manage.png';
import {useSelector} from 'react-redux';

const Navbar = () => {
  const navigation = useNavigation();
  const profileUser = useSelector(state => state.profile.data);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={HumburgerPng} style={{width: 25, height: 25}} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', gap: 40}}>
        {profileUser.data[0].role_id === 1 && (
          <Image source={manage} style={{width: 30, height: 30}} />
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image source={shippingCartPng} style={{width: 30, height: 30}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '6%',
    borderColor: 'black',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingRight: 40,
  },
});
