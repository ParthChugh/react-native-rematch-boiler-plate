import React, {useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Colors, Typography} from 'react-native-ui-lib';
import Chats from '../screens/contents/Chats';
import SingleChat from '../screens/contents/Chats/SingleChat';
import PersonProfile from '../screens/contents/Chats/PersonProfile';
import {Layout} from '../screens/Layout';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {BackButton} from '../assets/svgs';

const ChatstackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.PrimaryColor,
  },
  headerTitleAlign: 'left',
  headerTintColor: 'white',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerBackTitleVisible: false,
  headerTitleStyle: {
    fontFamily: Typography.primaryFontFamily,
    alignSelf: 'flex-start',
    width: '100%',
  },
};

export const ChatsNavigator = ({navigation, route}) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: routeName === 'Chats' || typeof routeName === 'undefined',
    });
  }, [navigation, routeName]);

  return (
    <ChatstackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ChatstackNavigator.Screen
        name="Chats"
        component={Chats}
        options={{
          title: 'AdCast',
          headerBackImage: () => <BackButton color={'white'} />,
        }}
      />
      <ChatstackNavigator.Screen
        name="SingleChat"
        component={SingleChat}
        screenOptions={{
          tabBarVisible: false,
        }}
        options={{
          headerBackImage: () => <BackButton color={'white'} />,
        }}
      />
      <ChatstackNavigator.Screen
        name="PersonProfile"
        component={Layout(PersonProfile)}
        screenOptions={{
          tabBarVisible: false,
        }}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          title: '',
          headerTransparent: {
            position: 'absolute',
          },
          headerBackImage: () => <BackButton color={'white'} />,
        }}
      />
    </ChatstackNavigator.Navigator>
  );
};
