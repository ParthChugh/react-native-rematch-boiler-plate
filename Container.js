import React, {useEffect} from 'react';
import {IntroNavigator} from './src/navigation/IntroStack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Colors} from 'react-native-ui-lib';
import AuthNavigator from './src/navigation/AuthStack';
import useAsyncStorage from './src/hooks/useAsyncStorage';
import {connect} from 'react-redux';

function Container(props) {
  const {
    user: {user},
    dispatch,
  } = props;

  const [userData] = useAsyncStorage('userData', {});

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.baseColor,
    },
  };

  useEffect(() => {
    if (userData && userData?.user) {
      dispatch({
        type: 'user/update_user_success',
        payload: {response: userData},
      });
    }
  }, [userData]);
  return (
    <NavigationContainer theme={MyTheme}>
      <IntroNavigator />
    </NavigationContainer>
  );
}

const mapState = state => ({
  user: state.user,
});
const mapDispatch = dispatch => ({
  dispatch,
});
export default connect(mapState, mapDispatch)(Container);
