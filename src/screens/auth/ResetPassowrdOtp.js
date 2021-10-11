import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Text, View, Typography, Button} from 'react-native-ui-lib';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CustomButton from '../common/CustomButton';

const ResetPasswordOTP = props => {
  const CELL_COUNT = 4;
  const {
    navigation: {navigate},
    createAccount,
  } = props;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [customProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onSubmit = () => {
    if (value?.split('').length === 4) {
      if (createAccount) {
        navigate('createAccountForm', props.route);
      } else {
        navigate('changePassword', props.route);
      }
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text center style={styles.label}>
            OTP Code
          </Text>
          <Text center style={styles.sublabel}>
            Enter the verification code that we’ve send you.
          </Text>
          <View>
            <CodeField
              ref={ref}
              {...customProps}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.otpTextInput}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text
                    key={index}
                    style={[
                      styles.underlineStyleBase,
                      isFocused && styles.focusCell,
                    ]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      <CustomButton handleSubmit={onSubmit} buttonText={'Continue'} />
      <View style={styles.button}>
        <Button
          backgroundColor={Colors.white}
          label="Send Again"
          size="small"
          color={Colors.PrimaryColor}
          margin-10
        />
      </View>
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
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  buttonStyle: {
    paddingTop: 15,
    fontWeight: 'bold',
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
    paddingHorizontal: 20,
    color: Colors.SecondaryColorLight,
    marginBottom: 30,
    marginVertical: -10,
  },
  label: {
    fontFamily: Typography.primaryFontFamily,
    paddingHorizontal: 30,
    ...Typography.text60,
    marginVertical: 20,
  },
  underlineStyleBase: {
    width: 65,
    height: 50,
    color: 'black',
    borderWidth: 1,
    borderColor: Colors.PrimaryColor,
    backgroundColor: Colors.PrimaryColorMedium,
    borderRadius: 5,
    textAlign: 'center',
    paddingTop: 15,
  },
  underlineStyleHighLighted: {
    borderColor: 'black',
    backgroundColor: Colors.PrimaryColorMedium,
  },
  otpTextInput: {
    width: '100%',
    height: 100,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default ResetPasswordOTP;
