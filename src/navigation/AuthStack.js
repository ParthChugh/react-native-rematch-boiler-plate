import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import ResetPassword from '../screens/auth/ResetPassword';
import ResetPasswordOtp from '../screens/auth/ResetPassowrdOtp';
import CreateAccount from '../screens/auth/CreateAccount';
import CreateAccountOtp from '../screens/auth/CreateAccountOtp';
import CreateAccountForm from '../screens/auth/CreateAccountForm';
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
      <>
        <AuthStackNavigator.Screen
          name="createAccountForm"
          component={Layout(CreateAccountForm)}
          options={{
            title: 'Create Account',
            headerBackImage: () => <BackButton color={'black'} />,
          }}
        />
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
      </>
    </AuthStackNavigator.Navigator>
  );
};

const mapState = state => ({
  user: state.user,
});
export default connect(mapState, null)(AuthNavigator);
