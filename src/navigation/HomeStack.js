import React, {useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Colors, View, Typography} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import Home from '../screens/contents/Home';
import SingleChat from '../screens/contents/Chats/SingleChat';
import PersonProfile from '../screens/contents/Chats/PersonProfile';
import {Dots, BackButton} from '../assets/svgs';
import {Layout} from '../screens/Layout';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const HomeStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.PrimaryColor || '#008CFF',
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

export const HomeNavigator = ({navigation, route}) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  useEffect(() => {
    navigation.setOptions({
      tabBarVisible: routeName === 'Home' || typeof routeName === 'undefined',
    });
  }, [navigation, routeName]);
  return (
    <HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HomeStackNavigator.Screen
        name="Home"
        component={Layout(Home)}
        options={{
          title: 'StoreFront',
          headerRight: () => (
            <View style={styles.marginRight10}>
              <Dots />
            </View>
          ),
        }}
      />
      <HomeStackNavigator.Screen
        name="SingleChat"
        component={SingleChat}
        screenOptions={{
          tabBarVisible: false,
        }}
        options={{
          headerBackImage: () => <BackButton color={'white'} />,
        }}
      />
      <HomeStackNavigator.Screen
        name="PersonProfile"
        component={Layout(PersonProfile)}
        options={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerBackImage: () => <BackButton color={'white'} />,
          title: '',
          headerTransparent: {
            position: 'absolute',
          },
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  marginRight10: {
    marginRight: 10,
  },
});
