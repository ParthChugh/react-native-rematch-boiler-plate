import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Typography} from 'react-native-ui-lib';
import Intro from '../screens/welcome/Intro';
import InitialScreen from '../screens/welcome/InitialScreen';
import AuthType from '../screens/auth/AuthType';
import AuthNavigator from './AuthStack';
import {Layout} from '../screens/Layout';

const IntroStackNavigator = createStackNavigator();

const defaultNavOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerTitleAlign: 'left',
  headerBackTitleVisible: false,
  headerTitleStyle: {
    fontFamily: Typography.primaryFontFamily,
    alignSelf: 'flex-start',
    width: '100%',
  },
};

export const IntroNavigator = () => {
  return (
    <IntroStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <IntroStackNavigator.Screen
        name="initialScreen"
        options={{title: 'Intro', headerShown: false}}
        component={Layout(InitialScreen)}
      />
      <IntroStackNavigator.Screen
        name="intro"
        options={{title: 'Intro', headerShown: false}}
        component={Layout(Intro)}
      />
      <IntroStackNavigator.Screen
        name="authType"
        options={{title: 'Choose Login Type', headerShown: false}}
        component={Layout(AuthType)}
      />
      <IntroStackNavigator.Screen
        name="authentication"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
    </IntroStackNavigator.Navigator>
  );
};
