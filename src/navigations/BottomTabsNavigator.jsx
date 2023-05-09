import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {COLORS, ROUTES} from '../constans';
// import {Home, Wallet, Notifications, Settings} from '../screens';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import SettingsNavigator from './SettingsNavigator';
import CustomTabBarButton from '../components/CustomTabBarButton';
import CustomTabBar from '../components/CustomTabBar';
import {useNavigation} from '@react-navigation/native';
import {Chat, Profile, Home} from '../screen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.dark,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primary,
        // tabBarIcon: ({color, size, focused}) => {
        //   let iconName;

        //   if (route.name === ROUTES.HOME_TAB) {
        //     iconName = focused ? 'comments' : 'comments';
        //   } else if (route.name === ROUTES.PROFILE) {
        //     iconName = focused ? 'comments' : 'comments';
        //   } else if (route.name === ROUTES.CHAT) {
        //     iconName = focused ? 'comments' : 'comments';
        //   }
        //   return <Icon name={iconName} size={22} color={color} />;
        // },
      })}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.CHAT}
        component={Chat}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      {/* <Tab.Screen
        name={ROUTES.SETTINGS_NAVIGATOR}
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Settings',
          title: 'Settings',
          headerShown: true,
          tabBarButton: props => (
            <CustomTabBarButton route="settings" {...props} />
          ),
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon
                  name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                  size={30}
                  color={COLORS.dark}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            );
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 92,
  },
});
