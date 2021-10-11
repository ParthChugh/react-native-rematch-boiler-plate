import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import store from '../../../store';
import CountryPicker from 'react-native-country-picker-modal';
import {
  Colors,
  Text,
  View,
  Typography,
  TouchableOpacity,
} from 'react-native-ui-lib';
import {connect} from 'react-redux';
import CustomButton from '../common/CustomButton';
import tick from '../../assets/images/icons/tick.png';

const ResetPassword = props => {
  const [callingCode, setCallingCode] = useState(['91']);
  const [countryCode, setCountryCode] = useState('IN');
  const [visible, setVisible] = useState(false);

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode);
  };

  const {
    navigation: {navigate},
    createAccount,
    mobile,
    error,
    sendOtp,
    dispatch,
    clearMobileState,
  } = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = params => {
    if (createAccount) {
      sendOtp(params);
    } else {
      navigate('resetPasswordOtp');
    }
  };
  useEffect(() => {
    if (error) {
      showMessage({
        message: 'Phone number already exist',
        type: 'danger',
      });
      clearMobileState();
    }
  }, [error]);

  useFocusEffect(
    React.useCallback(() => {
      if (mobile) {
        dispatch({
          type: 'user/clear_mobile_state',
        });
        navigate('createAccountOtp', {mobile});
      }
      return () => {};
    }, [mobile]),
  );
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text center style={styles.label}>
            Continue With Phone
          </Text>
          <Text center style={styles.sublabel}>
            Please enter phone number associated with your account. We will send
            you a 4 digit code.
          </Text>
        </View>
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
                {!errors.mobile && value.split('').length >= 10 && (
                  <Image source={tick} style={styles.icon} />
                )}
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
          rules={{required: true, minLength: 8}}
          defaultValue=""
        />
      </View>

      <CustomButton
        handleSubmit={handleSubmit(onSubmit)}
        buttonText={'Continue'}
        loading={props.request}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
  },

  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.textboxBorder,
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
  termsCondition: {
    paddingVertical: 10,
    textAlign: 'right',
  },
  sublabel: {
    fontFamily: Typography.primaryFontFamily,
    paddingHorizontal: 10,
    color: Colors.SecondaryColorLight,
    marginBottom: 20,
  },
  label: {
    fontFamily: Typography.primaryFontFamily,
    paddingHorizontal: 30,
    ...Typography.text60,
    marginVertical: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: -30,
  },
});

const selection = store.select.request.isActionLoading('user/send_otp');

const mapState = state => ({
  mobile: state.user.otpResponse.mobile,
  error: state.user.otpResponse.error,
  request: selection(state),
});

const mapDispatch = dispatch => ({
  dispatch,
  sendOtp: props => dispatch.user.send_otp(props),
  clearMobileState: () => dispatch.user.clear_mobile_state(),
});
export default connect(mapState, mapDispatch)(ResetPassword);
