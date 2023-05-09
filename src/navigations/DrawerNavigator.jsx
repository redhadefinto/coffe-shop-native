import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS, ROUTES} from '../constans';
import {Profile, Chat} from '../screen';
import BottomTabNavigator from './BottomTabsNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustumDrawer';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name={ROUTES.HOME_DRAWER}
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="home-sharp" size={18} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name={ROUTES.PROFILE_DRAWER}
        component={Profile}
        options={{
          title: 'Profile',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="Profile" size={18} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name={ROUTES.Chat_DRAWER}
        component={Chat}
        options={{
          title: 'Chat',
          drawerIcon: ({focused, color, size}) => (
            <Icon name="Chat" size={18} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
