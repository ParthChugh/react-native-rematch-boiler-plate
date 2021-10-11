import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Profile from '../screens/contents/Profile';
import {StyleSheet} from 'react-native';
import {Colors, View, Typography} from 'react-native-ui-lib';
import {Dots, BackButton} from '../assets/svgs';
import {Layout} from '../screens/Layout';

const ProfileStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.white,
  },
  headerTitleAlign: 'left',
  headerTintColor: 'black',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerBackTitleVisible: false,
  headerTitleStyle: {
    fontFamily: Typography.primaryFontFamily,
    alignSelf: 'flex-start',
    width: '100%',
  },
};

export const ProfileNavigator = ({navigation}) => {
  return (
    <>
      <ProfileStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <ProfileStackNavigator.Screen
          name="Profile"
          component={Layout(Profile)}
          options={{
            headerRight: () => (
              <View style={styles.marginRight10}>
                <Dots color="black" />
              </View>
            ),
            headerBackImage: () => <BackButton color={'black'} />,
          }}
        />
      </ProfileStackNavigator.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  marginRight10: {
    marginRight: 10,
  },
});
