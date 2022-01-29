import {
  LOGIN_URL,
  CREATE_PROFILE,
  EDIT_PROFILE,
  SEND_OTP,
} from '../constants/api_urls';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const user = {
  state: {
    user: null,
    error: null,
    otpResponse: {mobile: null, error: null},
  },
  reducers: {
    update_user_success(state, {response}) {
      console.log('i', response)
      AsyncStorage.setItem('userData', JSON.stringify(response || {}));
      return {
        ...state,
        user: response.user,
        error: response.error,
      };
    },
    clear_mobile_state(state) {
      return {
        ...state,
        otpResponse: {mobile: null, error: null},
      };
    },
    clear_error(state) {
      return {
        ...state,
        error: null,
      };
    },
    send_otp_success(state, {response}) {
      return {
        ...state,
        otpResponse: response,
      };
    },
  },
  effects: dispatch => ({
    async update_user(props) {
      console.log('props3113', props)
      return dispatch({
        type: 'user/update_user',
        request: {
          url: LOGIN_URL,
          data: props,
          method: 'post',
          loader: true,
        },
      });
    },
    async create_user(props) {
      return dispatch({
        type: 'user/update_user',
        request: {
          url: CREATE_PROFILE,
          data: props,
          method: 'post',
          loader: true,
        },
      });
    },
    async edit_user(props) {
      return dispatch({
        type: 'user/update_user',
        request: {
          url: EDIT_PROFILE,
          data: props,
          method: 'post',
          loader: true,
        },
      });
    },
    async send_otp(props) {
      return dispatch({
        type: 'user/send_otp',
        request: {
          url: SEND_OTP,
          data: props,
          method: 'post',
          loader: true,
        },
      });
    },
    updateUserSuccess(payload) {
      console.log('caaleeed')
      return dispatch({
        type: 'user/update_user_success',
        payload
      });
    },
  }),
};
