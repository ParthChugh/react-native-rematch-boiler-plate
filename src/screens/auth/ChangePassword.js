import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {
  Colors,
  Text,
  View,
  TouchableOpacity,
  Typography,
} from 'react-native-ui-lib';
import showIcon from '../../assets/images/icons/view.png';
import hideIcon from '../../assets/images/icons/hide.png';

const ChangePassword = props => {
  const {
    navigation: {navigate},
  } = props;
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const onSubmit = () => {
    navigate('Home');
  };
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const changeConfirmPasswordHiddenState = () => {
    if (confirmPasswordHidden) {
      setConfirmPasswordHidden(false);
    } else {
      setConfirmPasswordHidden(true);
    }
  };
  const changePasswordHiddenState = () => {
    if (passwordHidden) {
      setPasswordHidden(false);
    } else {
      setPasswordHidden(true);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text center style={styles.label}>
            Create New Password
          </Text>
          <Text center style={styles.sublabel}>
            Please enter your new password for your account
          </Text>
        </View>
        <Text color={Colors.SecondaryColorLight}>Password</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <View style={styles.passwordViewContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.password
                        ? 'red'
                        : Colors.textboxBorder,
                    },
                  ]}
                  secureTextEntry={passwordHidden}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
                <TouchableOpacity
                  style={styles.icon}
                  onPress={changePasswordHiddenState}>
                  <Image
                    source={passwordHidden ? hideIcon : showIcon}
                    style={{width: 18, height: 18}}
                  />
                </TouchableOpacity>
              </View>
              {errors.password ? (
                <Text style={{color: Colors.ErrorRed}}>
                  Password is required.
                </Text>
              ) : (
                <Text> </Text>
              )}
            </View>
          )}
          rules={{required: true}}
          name="password"
          defaultValue=""
        />
        <Text color={Colors.SecondaryColorLight}>Confirm Password</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <View>
              <View style={styles.passwordViewContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.confirmPassword
                        ? 'red'
                        : Colors.textboxBorder,
                    },
                  ]}
                  secureTextEntry={confirmPasswordHidden}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
                <TouchableOpacity
                  style={styles.icon}
                  onPress={changeConfirmPasswordHiddenState}>
                  <Image
                    source={confirmPasswordHidden ? hideIcon : showIcon}
                    style={{width: 18, height: 18}}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? (
                <Text style={{color: Colors.ErrorRed}}>
                  Confirm Password is required.
                </Text>
              ) : (
                <Text> </Text>
              )}
            </View>
          )}
          rules={{required: true}}
          name="confirmPassword"
          defaultValue=""
        />
      </View>

      <TouchableOpacity
        backgroundColor={Colors.PrimaryColor}
        style={styles.button}
        margin-10
        onPress={handleSubmit(onSubmit)}>
        <Text center color={Colors.white} style={styles.buttonStyle}>
          Continue
        </Text>
      </TouchableOpacity>
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
    marginHorizontal: 10,
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },

  buttonStyle: {
    paddingTop: 15,
    fontWeight: '600',
    fontSize: 16,
  },
  button: {
    borderRadius: 5,
    height: 50,
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
    marginTop: -5,
  },
  label: {
    fontFamily: Typography.primaryFontFamily,
    paddingHorizontal: 30,
    ...Typography.text60,
    marginVertical: 20,
  },
});

export default ChangePassword;
