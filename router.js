/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './src/screen/Login';
import SignUp from './src/screen/SignUp';
import HomePage from './src/screen/HomePage';
import LandingPage from './src/screen/LandingPage';
import WelcomePage from './src/screen/WelcomePage';
import Favorite from './src/screen/Favorite';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProductDetail from './src/screen/ProductDetail';
import CustomDrawer from './src/components/CustomDrawer';
import CustomTabBar from './src/components/CustomTabBar';
import CustomTabBarButton from './src/components/CustomTabBarButton';
import {Image, StyleSheet} from 'react-native';
import Profile from './src/screen/Profile';
import Cart from './src/screen/Cart';
import Chat from './src/screen/Chat';
import ProductAll from './src/screen/ProductAll';
import Delivery from './src/screen/Delivery';

const DrawerNavigator = props => {
  const {Navigator, Screen} = createDrawerNavigator();
  const navigation = useNavigation();
  const navigateToCart = () => {
    props.navigation.navigate('Home', {screen: 'Cart'});
  };
  const navigateToHome = () => {
    props.navigation.navigate('Home', {screen: 'Home'});
  };
  const navigateToChat = () => {
    props.navigation.navigate('Home', {screen: 'Chat'});
  };
  const navigateToProfile = () => {
    props.navigation.navigate('Home', {screen: 'Profile'});
  };
  return (
    <Navigator
      initialRouteName="Home"
      // eslint-disable-next-line react/jsx-no-undef
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#6A4029',
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {
          marginLeft: 10,
        },
      }}>
      <Screen
        name="Home"
        component={BottomTabs}
        listeners={() => ({
          focus: navigateToHome,
        })}
        options={{
          title: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('./src/assets/icon/home_active.png')}
              style={{width: size, height: size, position: 'absolute'}}
            />
          ),
        }}
      />
      <Screen
        name="Cart"
        component={Cart}
        listeners={() => ({
          focus: navigateToCart,
        })}
        options={{
          title: 'Cart',
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('./src/assets/icon/cart_active.png')}
              style={{width: size, height: size, position: 'absolute'}}
            />
          ),
        }}
      />
      <Screen
        name="Chat"
        component={Chat}
        listeners={() => ({
          focus: navigateToChat,
        })}
        options={{
          title: 'Chat',
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('./src/assets/icon/comment_active.png')}
              style={{width: size, height: size, position: 'absolute'}}
            />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        listeners={() => ({
          focus: navigateToProfile,
        })}
        options={{
          title: 'Profile',
          drawerIcon: ({focused, color, size}) => (
            <Image
              source={require('./src/assets/icon/profile_active.png')}
              style={{width: size, height: size, position: 'absolute'}}
            />
          ),
        }}
      />
    </Navigator>
  );
};

const BottomTabs = props => {
  const {Navigator, Screen} = createBottomTabNavigator();
  const navigateToCart = () => {
    props.navigation.navigate('Home', {screen: 'Cart'});
  };
  const navigateToHome = () => {
    props.navigation.navigate('Home', {screen: 'Home'});
  };
  const navigateToChat = () => {
    props.navigation.navigate('Home', {screen: 'Chat'});
  };
  const navigateToProfile = () => {
    props.navigation.navigate('Home', {screen: 'Profile'});
  };
  return (
    <Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'black',
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#6A4029',
        tabBarIcon: ({color, size, focused}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('./src/assets/icon/home_active.png')
              : require('./src/assets/icon/home_inactive.png');
          } else if (route.name === 'Cart') {
            iconSource = focused
              ? require('./src/assets/icon/cart_active.png')
              : require('./src/assets/icon/cart_inactive.png');
          } else if (route.name === 'Chat') {
            iconSource = focused
              ? require('./src/assets/icon/comment_active.png')
              : require('./src/assets/icon/comment_inactive.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('./src/assets/icon/profile_active.png')
              : require('./src/assets/icon/profile_inactive.png');
          }

          return (
            <Image
              source={iconSource}
              style={{width: size, height: size, position: 'absolute'}}
            />
          );
        },
      })}>
      <Screen
        name="Home"
        component={HomePage}
        listeners={() => ({
          focus: navigateToHome,
        })}
        activeColor="#f0edf6"
        inactiveColor="#3e2465"
        barStyle={{backgroundColor: '#694fad'}}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Screen
        name="Cart"
        component={Cart}
        listeners={() => ({
          focus: navigateToCart,
        })}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Screen
        name="Chat"
        component={Chat}
        listeners={() => ({
          focus: navigateToChat,
        })}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        listeners={() => ({
          focus: navigateToProfile,
        })}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
    </Navigator>
  );
};

const StackNavigator = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator initialRouteName="DrawerNavigator">
      <Screen
        name="LandingPage"
        component={LandingPage}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ProductAll"
        component={ProductAll}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerShown: false,
        }}
      />
      <Screen name="Profile" component={Profile} />
      <Screen name="Cart" component={Cart} />
      <Screen name="Chat" component={Chat} />
      <Screen name="Delivery" component={Delivery} />
    </Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'none',
    borderTopWidth: 0,
    // borderWidth: 2,
    // bottom: 15,
    // right: 10,
    // left: 10,
    height: 80,
  },
});
