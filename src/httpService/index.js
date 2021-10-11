import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async () => {
  const item = await AsyncStorage.getItem('user');
  const user = item ? JSON.parse(item) : {};

  return user.api_key;
};

const httpService = axios.create({
  baseURL: '',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

const handleRequest = async req => {
  const token = await getAccessToken();
  if (token) {
    req.headers.Authorization = 'Token ' + token;
  }
  return req;
};

const handleError = async error => {
  let parsed_error = Object.assign({}, error);
  if (parsed_error.response.status === 401) {
    try {
      await AsyncStorage.removeItem('user');
    } catch (exception) {
      return false;
    }
  }
  return {parsed_error};
};

const handleResponse = response => {
  return Promise.resolve(response.data);
};

httpService.interceptors.request.use(handleRequest);
httpService.interceptors.response.use(handleResponse, handleError);

export default httpService;
