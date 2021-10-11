import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import ResetPassword from '../screens/auth/ResetPassword';
import ResetPasswordOtp from '../screens/auth/ResetPassowrdOtp';
import ChangePassword from '../screens/auth/ChangePassword';
import CreateAccount from '../screens/auth/CreateAccount';
import CreateAccountOtp from '../screens/auth/CreateAccountOtp';
import CreateAccountForm from '../screens/auth/CreateAccountForm';
import BuyCoins from '../screens/auth/BuyCoins';
import EditProfile from '../screens/auth/EditProfile';
import UpdateImages from '../screens/auth/UpdateImage';
import {BottomTabs} from './BottomStack';
import {Layout} from '../screens/Layout';
import {connect} from 'react-redux';
import {Typography} from 'react-native-ui-lib';
import {BackButton} from '../assets/svgs';

const AuthStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTitleAlign: 'left',
  headerTitleStyle: {
    fontFamily: Typography.primaryFontFamily,
    alignSelf: 'flex-start',
    width: '100%',
  },
  headerTintColor: 'black',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerBackTitleVisible: false,
};

const AuthNavigator = ({user}) => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      {user.user ? (
        <>
          <AuthStackNavigator.Screen
            name="BuyCoins"
            component={BuyCoins}
            options={{title: 'Purchase Coins'}}
          />
          <AuthStackNavigator.Screen
            name="EditProfile"
            component={Layout(EditProfile)}
            options={{
              title: 'Edit Profile',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
          <AuthStackNavigator.Screen
            name="UpdateImages"
            component={Layout(UpdateImages)}
            options={{
              title: 'Update Photos',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
          <AuthStackNavigator.Screen
            name="Home"
            component={BottomTabs}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <AuthStackNavigator.Screen
            name="signIn"
            component={Layout(SignIn)}
            options={{
              title: 'Login',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
          <AuthStackNavigator.Screen
            name="resetPassword"
            component={Layout(ResetPassword)}
            options={{
              title: 'Reset Password',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
          <AuthStackNavigator.Screen
            name="resetPasswordOtp"
            component={Layout(ResetPasswordOtp)}
            options={{
              title: 'Reset Password',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
          <AuthStackNavigator.Screen
            name="changePassword"
            component={Layout(ChangePassword)}
            options={{
              title: 'Reset Password',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
          <AuthStackNavigator.Screen
            name="createAccountView"
            component={Layout(CreateAccount)}
            options={{
              title: 'Create Account',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
          <AuthStackNavigator.Screen
            name="createAccountOtp"
            component={Layout(CreateAccountOtp)}
            options={{
              title: 'Create Account',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
          <AuthStackNavigator.Screen
            name="createAccountForm"
            component={Layout(CreateAccountForm)}
            options={{
              title: 'Create Account',
              headerBackImage: () => <BackButton color={'black'} />,
            }}
          />
        </>
      )}
    </AuthStackNavigator.Navigator>
  );
};

const mapState = state => ({
  user: state.user,
});
export default connect(mapState, null)(AuthNavigator);
