import React from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Colors,
  Typography,
  TouchableOpacity,
} from 'react-native-ui-lib';
import {AuthType} from '../../assets/svgs';

const AuthTypeView = props => {
  const {
    navigation: {navigate},
  } = props;

  const navigateToNext = (screen, params) => {
    if (params) {
      navigate(screen, params);
    } else {
      navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      <AuthType />
      <Text center style={styles.header}>
        Welcome to StoreFront
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          backgroundColor={Colors.PrimaryColor}
          style={styles.button}
          margin-10
          onPress={() => navigateToNext('authentication')}>
          <Text center color={Colors.white} style={styles.buttonStyle}>
            Continue
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          backgroundColor={Colors.searchBoxBg}
          style={styles.button}
          margin-10
          onPress={() =>
            navigateToNext('authentication', {screen: 'createAccountView'})
          }>
          <Text center color={Colors.darkBlack} style={styles.buttonStyle}>
            CREATE ACCOUNT
          </Text>
        </TouchableOpacity> */}
      </View>
      <View>
        <Text center style={styles.termsCondition}>
          By signing up you agree to StoreFront
        </Text>
        <Text center color={Colors.PrimaryColor} style={styles.termsCondition}>
          Terms of Use{' '}
          <Text center color={Colors.PrimaryText} style={styles.termsCondition}>
            &{' '}
          </Text>
          <Text
            center
            color={Colors.PrimaryColor}
            style={styles.termsCondition}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    height: 50,
  },
  header: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
    fontFamily: Typography.primaryFontFamily,
    paddingHorizontal: 30,
  },
  header2: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Typography.primaryFontFamily,
    paddingHorizontal: 30,
    marginTop: -50,
  },
  centerAlign: {
    alignItems: 'center',
    paddingTop: 100,
    marginBottom: -100,
  },
  buttonStyle: {
    paddingTop: 15,
    fontWeight: '600',
  },
  termsCondition: {
    fontSize: 12,
    fontFamily: Typography.primaryFontFamily,
    paddingHorizontal: 30,
    paddingBottom: 8,
  },
});

export default AuthTypeView;
