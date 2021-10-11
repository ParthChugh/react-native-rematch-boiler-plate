import React from 'react';
import {
  Colors,
  Image,
  Text,
  View,
  TouchableOpacity,
  Picker,
  Carousel,
  Typography,
} from 'react-native-ui-lib';
import {StyleSheet, TextInput, Linking} from 'react-native';
import {
  Male,
  Female,
  Share,
  Facebook,
  Instagram,
  Twitter,
  CameraUpload,
} from '../../assets/svgs';
import {useForm, Controller} from 'react-hook-form';
import DatePicker from '../common/DateTimePicker';
import {connect} from 'react-redux';
import CustomButton from '../common/CustomButton';
import tick from '../../assets/images/icons/tick.png';

const pickerData = [
  {label: 'Relationship', value: 'relationship'},
  {label: 'Dating', value: 'dating'},
  {label: 'Marriage', value: 'Marriage'},
];

const EditProfile = props => {
  const {
    userData: {user},
    editProfile,
  } = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: user.name,
      gender: user.gender,
      dob: user.dob,
      mobile: user.mobile,
      aboutMe: user.aboutMe,
      images: JSON.stringify(user.images),
      reason: user.reason,
    },
  });

  const onSubmit = params => {
    params = {...params, images: JSON.parse(params.images)};
    editProfile(params);
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Carousel
            containerStyle={{
              height: 400,
              width: '100%',
            }}
            showCounter>
            {JSON.parse(value).map((el, index) => {
              if (!el) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.uploadIcon}
                    onPress={() => {
                      props.navigation.navigate('UpdateImages', {
                        images: JSON.parse(value),
                        onChange,
                      });
                    }}>
                    <CameraUpload />
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  style={styles.uploadIcon}
                  onPress={() => {
                    props.navigation.navigate('UpdateImages', {
                      images: JSON.parse(value),
                      onChange,
                    });
                  }}>
                  <View style={styles.upload}>
                    <CameraUpload />
                  </View>
                  <Image
                    source={{uri: `data:image/png;base64,${el}`}}
                    // resizeMode={'contain'}
                    style={{
                      width: '100%',
                      height: 400,
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
            // defaultValue={user.name}
            value={value}
          />
        )}
        name="name"
        rules={{required: true}}
      />
      {errors.name ? (
        <Text style={{color: Colors.ErrorRed, marginTop:-5}}>Name is required.</Text>
      ) : (
        <Text> </Text>
      )}
      <Text style={[styles.lablestyle, {marginTop: 10}]}>Gender</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => {
          // value = (value || user.gender)
          return (
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
                  Male{' '}
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
                  color={
                    value === 'female' ? Colors.white : 'rgba(43,41,46,0.7)'
                  }
                  style={styles.buttonStyle}>
                  Female{' '}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        name="gender"
        rules={{required: true}}
        defaultValue={''}
      />

      <Text style={[styles.lablestyle, {marginTop: 14}]}>Date of Birth</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <DatePicker
              onDateSelected={value => onChange(value)}
              style={[
                // styles.input,
                {
                  color: Colors.darkBlack,
                  borderColor: errors.dob ? 'red' : Colors.textboxBorder,
                },
              ]}
              value={value}
              mode={'date'}
            />
          );
        }}
        name="dob"
        rules={{required: true}}
        defaultValue=""
      />
      <Text style={[styles.lablestyle, {marginTop: 15}]}>Phone no</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TextInput
              keyboardType="numeric"
              maxLength={10}
              // multiline
              style={[
                styles.input,
                {borderColor: errors.mobile ? 'red' : Colors.textboxBorder},
              ]}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
              {!errors.mobile && value.split('').length >= 10 && (
                  <Image source={tick} style={styles.icon} />
              )}
          </View>
        )}
        
        name="mobile"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.mobile ? (
        <Text style={{color: Colors.ErrorRed, marginTop:-5}}>Phone number is required.</Text>
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
        <Text style={{color: Colors.ErrorRed, marginTop:-5}}>About me is required.</Text>
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
            migrate
            placeholder=""
            value={value}
            containerStyle={[
              {
                height:50,
                borderWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                paddingLeft: 10,
                paddingTop: 19,
                color: Colors.darkBlack,
              }
            ]}
            onChange={items => onChange(items)}>
            {pickerData.map(option => (
              <Picker.Item key={option.value} value={option} />
            ))}
          </Picker>
        )}
        name="reason"
        rules={{required: true}}
        defaultValue=""
      />
      <View style={styles.textIcon}>
        <Text style={[styles.lablestyle, {marginTop: 10}]}>
          Link Profile{'  '}{' '}
        </Text>
        <Share />
      </View>

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View
            style={[
              styles.textIcon,
              {justifyContent: 'space-around', marginTop: 20},
            ]}>
            <TouchableOpacity
              onPress={() => Linking.openURL('facebook://timeline')}>
              <Facebook />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('instagram://timeline')}>
              <Instagram />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('twitter://timeline')}>
              <Twitter />
            </TouchableOpacity>
          </View>
        )}
        name="aboutMe"
        rules={{required: false}}
        defaultValue=""
      />
      <CustomButton
        style={{marginTop:40, borderRadius:5, height:50}}
        handleSubmit={handleSubmit(onSubmit)}
        buttonText={'UPDATE'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  uploadIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 50,
    width:'100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
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
    marginTop: 15
  },
  genderContainer: {
    flexDirection: 'row',
  },
  upload: {
    position: 'absolute',
    zIndex: 999,
    opacity: 0.5,
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: -30,
  },
});

const mapState = state => ({
  userData: state.user,
});
const mapDispatch = dispatch => ({
  editProfile: props => dispatch.user.edit_user(props),
});
export default connect(mapState, mapDispatch)(EditProfile);
