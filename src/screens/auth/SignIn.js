import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Image} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import {connect} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {useForm, Controller} from 'react-hook-form';
import store from '../../../store';
import {
  Colors,
  Text,
  View,
  TouchableOpacity,
  Typography,
} from 'react-native-ui-lib';
import showIcon from '../../assets/images/icons/view.png';
import hideIcon from '../../assets/images/icons/hide.png';
import CustomButton from '../common/CustomButton';

const SignIn = props => {
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState(['91']);
  const [visible, setVisible] = useState(false);
  const {
    navigation: {navigate},
    user,
    login,
    request,
    clearError,
  } = props;

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = params => {
    login(params);
  };
  useEffect(() => {
    if (user.error) {
      showMessage({
        message: 'Your password is wrong',
        type: 'danger',
      });
      clearError();
    }
  }, [user.error]);

  useEffect(() => {
    if (user.user) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BuyCoins'}],
        }),
      );
    }
  }, [user.user]);

  const changeConfirmPasswordHiddenState = () => {
    if (confirmPasswordHidden) {
      setConfirmPasswordHidden(false);
    } else {
      setConfirmPasswordHidden(true);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label} color={Colors.SecondaryColorLight}>
          Mobile Number
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '95%',
                }}>
                <View
                  style={[
                    styles.countryBox,
                    {borderColor: Colors.textboxBorder},
                  ]}>
                  <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCountryNameButton={false}
                    withAlphaFilter
                    withCallingCode
                    withEmoji
                    onSelect={onSelect}
                    onClose={() => setVisible(false)}
                    visible={visible}
                  />
                  <TouchableOpacity onPress={() => setVisible(true)}>
                    <Text style={{marginRight: 5}}>+{callingCode.join()}</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  keyboardType={'numeric'}
                  maxLength={10}
                  style={[
                    styles.input,
                    {
                      borderColor: errors.mobile ? 'red' : Colors.textboxBorder,
                      width: '80%',
                    },
                  ]}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
              </View>
              {errors.mobile ? (
                <Text style={{color: Colors.ErrorRed}}>
                  Phone number is required.
                </Text>
              ) : (
                <Text> </Text>
              )}
            </View>
          )}
          name="mobile"
          rules={{required: true}}
          defaultValue=""
        />
      </View>
      <CustomButton
        handleSubmit={handleSubmit(onSubmit)}
        style={styles.button}
        buttonText={'LOGIN'}
        loading={request}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  passwordViewContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: 25,
    right: 20,
    width: 18,
    height: 18,
  },
  container: {
    marginHorizontal: 16,
  },
  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    color: Colors.darkBlack,
    marginLeft: 10,
  },
  passwordInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    color: Colors.darkBlack,
  },
  label: {
    marginTop: 40,
    fontSize: 13,
    fontFamily: Typography.primaryFontFamily,
  },
  labelpassword: {
    marginTop: -5,
    fontSize: 13,
    fontFamily: Typography.primaryFontFamily,
  },

  buttonStyle: {
    paddingTop: 15,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    height: 50,
    marginHorizontal: 16,
    marginTop: 25,
  },
  termsCondition: {
    // paddingVertical: 10,
    marginTop: -10,
    textAlign: 'right',
  },
});

const selection = store.select.request.isActionLoading('user/update_user');

const mapState = state => ({
  user: state.user,
  request: selection(state),
});

const mapDispatch = dispatch => ({
  login: props => dispatch.user.update_user(props),
  clearError: () => dispatch.user.clear_error(),
});

export default connect(mapState, mapDispatch)(SignIn);
