import React, {useState} from 'react';
import {
  Colors,
  Image,
  Text,
  View,
  TouchableOpacity,
  Carousel,
  Picker,
  Typography,
} from 'react-native-ui-lib';
import {StyleSheet, TextInput} from 'react-native';
import {UploadImage, Male, Female} from '../../assets/svgs';
import {connect} from 'react-redux';
import store from '../../../store';
import {useForm, Controller} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import DatePicker from '../common/DateTimePicker';
import dayjs from 'dayjs';
import CustomButton from '../common/CustomButton';
import showIcon from '../../assets/images/icons/view.png';
import hideIcon from '../../assets/images/icons/hide.png';

const pickerData = [
  {label: 'Relationship', value: 'relationship'},
  {label: 'Dating', value: 'dating'},
  {label: 'Marriage', value: 'Marriage'},
];
const CreateAccountForm = props => {
  const {
    createUser,
    otpResponse: {mobile},
    request,
  } = props;
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
  const images = [null, null, null, null, null];

  const options = {
    title: 'Get Image from Gallery',
    includeBase64: true,
    quality: 0.1,
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {images: JSON.stringify(images)},
  });
  const onSubmit = params => {
    params = {
      ...params,
      images: JSON.parse(params.images),
      mobile: mobile,
      dob: dayjs(params.dob).format('DD/MM/YYYY'),
    };
    createUser(params);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Carousel
            showCounter
            containerStyle={{
              height: 300,
              width: '100%',
            }}>
            {JSON.parse(value).map((el, index) => {
              if (!el) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.uploadIcon}
                    onPress={() => {
                      let updatedValue = JSON.parse(value);
                      launchImageLibrary(options, response => {
                        if (response.didCancel) {
                          onChange(JSON.stringify(updatedValue));
                        } else {
                          updatedValue[index] = response?.base64;
                          onChange(JSON.stringify(updatedValue));
                        }
                      });
                    }}>
                    <UploadImage />
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  style={styles.uploadIcon}
                  onPress={() => {
                    let updatedValue = JSON.parse(value);
                    launchImageLibrary(options, response => {
                      if (response.didCancel) {
                        onChange(JSON.stringify(updatedValue));
                      } else {
                        updatedValue[index] = response?.base64;

                        onChange(JSON.stringify(updatedValue));
                      }
                    });
                  }}>
                  <View style={styles.upload}>
                    <UploadImage />
                  </View>
                  <Image
                    source={{uri: `data:image/png;base64,${el}`}}
                    resizeMode={'contain'}
                    style={{
                      width: '100%',
                      height: 300,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </Carousel>
        )}
        name="images"
        rules={{required: false}}
      />
      <Text style={[styles.lablestyle]}>Name</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={[
              styles.input,
              {borderColor: errors.name ? 'red' : Colors.textboxBorder},
            ]}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="name"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.name ? (
        <Text style={{color: Colors.ErrorRed, marginTop: -5}}>
          Name is required.
        </Text>
      ) : (
        <Text> </Text>
      )}
      <Text style={[styles.lablestyle, {marginTop: 10}]}>
        Why are you here?
      </Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Picker
            marginT-15
            placeholder=""
            value={value}
            containerStyle={[
              {
                height: 50,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingLeft: 10,
                paddingTop: 19,
                color: Colors.darkBlack,
              },
              {borderColor: errors.reason ? 'red' : Colors.textboxBorder},
            ]}
            onChange={items => {
              onChange(items);
            }}>
            {pickerData.map(option => (
              <Picker.Item key={option.value} value={option} />
            ))}
          </Picker>
        )}
        name="reason"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.reason ? (
        <Text style={{color: Colors.ErrorRed, marginTop: -5}}>
          Why are you here? is required.
        </Text>
      ) : (
        <Text> </Text>
      )}

      <Text style={[styles.lablestyle, {marginTop: 10}]}>Date of Birth</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <DatePicker
            onDateSelected={value => onChange(value)}
            style={[
              styles.input,
              {borderColor: errors.dob ? 'red' : Colors.textboxBorder},
            ]}
            value={value}
            mode={'date'}
          />
        )}
        name="dob"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.dob ? (
        <Text style={{color: Colors.ErrorRed, marginTop: 1}}>
          Date of Birth is required.
        </Text>
      ) : (
        <Text> </Text>
      )}
      <Text style={[styles.lablestyle, {marginTop: 10}]}>Gender</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.genderContainer}>
            <TouchableOpacity
              backgroundColor={
                value === 'male' ? Colors.PrimaryColor : Colors.white
              }
              style={[
                styles.button,
                {
                  borderColor:
                    value === 'male'
                      ? Colors.PrimaryColor
                      : errors.gender
                      ? 'red'
                      : Colors.textboxBorder,
                },
              ]}
              margin-10
              onPress={() => onChange('male')}>
              <Male value={value === 'male'} />
              <Text
                center
                color={value === 'male' ? Colors.white : 'rgba(43,41,46,0.7)'}
                style={styles.buttonStyle}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              backgroundColor={
                value === 'female' ? Colors.PrimaryColor : Colors.white
              }
              style={[
                styles.btn,
                {
                  borderColor:
                    value === 'female'
                      ? Colors.PrimaryColor
                      : errors.gender
                      ? 'red'
                      : Colors.textboxBorder,
                },
              ]}
              margin-10
              onPress={() => onChange('female')}>
              <Female value={value === 'female'} />
              <Text
                center
                color={value === 'female' ? Colors.white : 'rgba(43,41,46,0.7)'}
                style={styles.buttonStyle}>
                Female
              </Text>
            </TouchableOpacity>
          </View>
        )}
        name="gender"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.gender ? (
        <Text style={{color: Colors.ErrorRed, marginTop: -5}}>
          Gender is required.
        </Text>
      ) : (
        <Text> </Text>
      )}
      <Text style={[styles.lablestyle, {marginTop: 10}]}>About me</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            multiline
            style={[
              styles.input,
              {
                height: 100,
                borderColor: errors.aboutMe ? 'red' : Colors.textboxBorder,
              },
            ]}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="aboutMe"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.aboutMe ? (
        <Text style={{color: Colors.ErrorRed}}>About me is required.</Text>
      ) : (
        <Text> </Text>
      )}

      <Text style={[styles.lablestyle, {marginTop: 10}]}>Password</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.passwordViewContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: errors.password ? 'red' : Colors.textboxBorder,
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
        )}
        rules={{required: true}}
        name="password"
        defaultValue=""
      />

      {errors.password ? (
        <Text style={{color: Colors.ErrorRed, marginTop: -5}}>
          Password is required.
        </Text>
      ) : (
        <Text> </Text>
      )}

      <Text style={[styles.lablestyle, {marginTop: 10}]}>Confirm Password</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
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
        )}
        rules={{required: true}}
        name="confirmPassword"
        defaultValue=""
      />
      {errors.confirmPassword ? (
        <Text style={{color: Colors.ErrorRed}}>
          Confirm password is required.
        </Text>
      ) : (
        <Text> </Text>
      )}
      <CustomButton
        handleSubmit={handleSubmit(onSubmit)}
        loading={request}
        buttonText={'Continue'}
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
  uploadIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    color: Colors.darkBlack,
  },
  container: {
    marginHorizontal: 10,
  },
  button: {
    borderRadius: 5,
    height: 50,
    width: '47%',
    marginLeft: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  btn: {
    borderRadius: 5,
    height: 50,
    width: '47%',
    marginLeft: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonStyle: {
    fontWeight: '600',
    marginLeft: 10,
  },
  lablestyle: {
    fontFamily: Typography.primaryFontFamily,
    fontWeight: '400',
    fontSize: 13,
    color: Colors.SecondaryColorLight,
    opacity: 0.7,
  },
  genderContainer: {
    flexDirection: 'row',
  },
  upload: {
    position: 'absolute',
    zIndex: 999,
    opacity: 0.5,
  },
});

const selection = store.select.request.isActionLoading('user/update_user');

const mapState = state => ({
  otpResponse: state.user.otpResponse,
  request: selection(state),
});

const mapDispatch = dispatch => ({
  dispatch,
  // login: (props) => dispatch.user.update_user(props),
  createUser: props => dispatch.user.create_user(props),
});
export default connect(mapState, mapDispatch)(CreateAccountForm);
