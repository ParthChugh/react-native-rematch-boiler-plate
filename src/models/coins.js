import {GET_COINS_URL} from '../constants/api_urls';
export const coins = {
  state: {
    coins: [],
  }, // initial state
  reducers: {
    get_coins_success(state, {response}) {
      return {
        ...state,
        coins: response,
      };
    },
  },
  effects: dispatch => ({
    getCoins() {
      return dispatch({
        type: 'coins/get_coins',
        request: {
          url: GET_COINS_URL,
          method: 'get',
          loader: true,
        },
      });
    },
  }),
};
