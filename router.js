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

const DrawerNavigator = () => {
  const {Navigator, Screen} = createDrawerNavigator();
  const navigation = useNavigation();
  const navigateToFavorite = () => {
    navigation.navigate('BottomTabs', {screen: 'Favorite'});
  };
  const navigateToHome = () => {
    navigation.navigate('BottomTabs', {screen: 'Home'});
  };

  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={BottomTabs}
        // options={{
        //   headerShown: false,
        // }}
        listeners={() => ({
          focus: navigateToHome, // Panggil navigateToFavorite saat layar Favorite fokus
        })}
      />
      <Screen
        name="Favorite"
        component={Favorite}
        // options={{
        //   headerShown: false,
        // }}
        listeners={() => ({
          focus: navigateToFavorite, // Panggil navigateToFavorite saat layar Favorite fokus
        })}
      />
    </Navigator>
  );
};

const BottomTabs = () => {
  const {Navigator, Screen} = createBottomTabNavigator();
  const navigation = useNavigation();
  const navigateToFavorite = () => {
    navigation.navigate('Home', {screen: 'Favorite'});
  };
  const navigateToHome = () => {
    navigation.navigate('Home', {screen: 'Home'});
  };
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomePage}
        listeners={() => ({
          focus: navigateToHome,
        })}
      />
      <Screen
        name="Favorite"
        component={Favorite}
        listeners={() => ({
          focus: navigateToFavorite,
        })}
      />
    </Navigator>
  );
};

const StackNavigator = () => {
  const {Navigator, Screen} = createStackNavigator();
  return (
    <Navigator>
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
      <Screen name="Favorite" component={Favorite} />
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
