import React, {useState} from 'react';
import {Colors, Text, View, Picker, Typography} from 'react-native-ui-lib';
import {StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import store from '../../../store';
import {useForm, Controller} from 'react-hook-form';
import dayjs from 'dayjs';
import {Right, Address} from '../../assets/svgs';
import CustomButton from '../common/CustomButton';


const pickerData = [
  {label: 'Ice cream truck', value: 'lorem ipsum 1'},
  {label: 'Food Truck', value: 'lorem ipsum 2'},
  {label: 'Grilled Cheeserie Truck', value: 'lorem ipsum 3'},
  {label: 'The Taco Truck', value: 'lorem ipsum 4'},
  {label: 'BBQ Truck', value: 'lorem ipsum 5'},
];
const CreateAccountForm = props => {
  const {
    createUser,
    otpResponse: {mobile},
    request,
  } = props;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {},
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
      <Text style={styles.label}>Business Details</Text>
      <Text style={styles.sublabel}>Some Details about the business.</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Picker
            marginT-15
            placeholder="Business Category"
            value={value}
            containerStyle={[
              //   {
              //     height: 50,
              //     borderWidth: 1,

              //     borderRadius: 5,
              //     marginVertical: 10,
              //     paddingLeft: 10,
              //     paddingTop: 19,
              //     color: Colors.darkBlack,
              //   },
              {borderColor: errors.reason ? 'red' : Colors.textboxBorder},
            ]}
            // rightIconSource={Check}
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
          Business Category is required.
        </Text>
      ) : (
        <Text> </Text>
      )}
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Address />
        <Text style={[styles.lablestyle]}>Address</Text>
      </View>

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
        name="address"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.aboutMe ? (
        <Text style={{color: Colors.ErrorRed}}>Address is required.</Text>
      ) : (
        <Text> </Text>
      )}
      <CustomButton
        handleSubmit={handleSubmit(onSubmit)}
        loading={request}
        buttonText={'Continue'}
        rightIcon={
          <View style={{position: 'absolute', top: '35%', left: '62%'}}>
            <Right />
          </View>
        }
        style={styles.button}
        buttonStyle={styles.buttonStyle}
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
  lablestyle: {
    fontFamily: Typography.primaryFontFamily,
    fontWeight: '400',
    fontSize: 13,
    color: Colors.SecondaryColorLight,
    opacity: 0.7,
    textAlignVertical: 'center',
    marginTop: 10,
  },

  button: {
    borderRadius: 25,
    height: 50,
    marginHorizontal: 16,
    marginTop: 25,
  },
  label: {
    marginTop: 40,
    fontSize: 32,
    fontFamily: Typography.primaryFontFamily,
    fontWeight: 'bold',
    color: Colors.PrimaryColor || '#008CFF',
  },
  sublabel: {
    // marginTop: 40,
    fontSize: 13,
    fontFamily: Typography.primaryFontFamily,
    marginBottom: 40,
  },
  buttonStyle: {
    paddingTop: 15,
    fontFamily: Typography.primaryFontFamily,
    fontWeight: '600',
    fontSize: 16,
    width: '100%',
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
