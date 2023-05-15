import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
// import {COLORS, IMGS} from '../constants';
import coffe1 from '../../assets/Products/coffe-1.png';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('screen');

const CustomDrawer = props => {
  const profileUser = useSelector(state => state.profile.data);
  // console.log(profileUser.data);
  return (
    <DrawerContentScrollView {...props}>
      {!profileUser.data ? (
        <Text>Loading</Text>
      ) : (
        <>
          <ImageBackground style={styles.containerImage}>
            <Image
              source={
                {uri: profileUser.data[0].image} ||
                require('../../assets/images/default-image.png')
              }
              style={styles.userImg}
            />
            <Text style={styles.textName}>
              {profileUser.data[0].first_name}
              {profileUser.data[0].last_name}
            </Text>
            <Text style={styles.textEmail}>{profileUser.data[0].email}</Text>
          </ImageBackground>
        </>
      )}
      <View style={styles.drawerListWrapper}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userImg: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  containerImage: {
    height: 250,
    width: '100%',
    backgroundColor: '#6A4029',
    position: 'relative',
    top: -4,
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopRightRadius: 30,
    borderBottomRightRadius: 50,
  },
  textEmail: {
    color: 'white',
    fontWeight: '500',
    marginTop: 5,
  },
  textName: {
    marginTop: 15,
    color: 'white',
    fontWeight: '800',
  },
  drawerListWrapper: {
    marginTop: 25,
  },
});
