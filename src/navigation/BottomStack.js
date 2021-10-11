import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Flame,
  FlameFocus,
  Chats,
  ChatsFocused,
  Profile,
  ProfileFocused,
} from '../assets/svgs';
import {HomeNavigator} from './HomeStack';
import {ChatsNavigator} from './ChatsStack';
import {ProfileNavigator} from './ProfileStack';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? <FlameFocus /> : <Flame />;
          } else if (route.name === 'Chats') {
            iconName = focused ? <ChatsFocused /> : <Chats />;
          } else if (route.name === 'Me') {
            iconName = focused ? <ProfileFocused /> : <Profile />;
          }
          return iconName;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          height: Platform.OS === 'ios' ? 84 : 60,
          backgroundColor: '#ffffff',
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsNavigator}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Me"
        component={ProfileNavigator}
        options={{
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};
