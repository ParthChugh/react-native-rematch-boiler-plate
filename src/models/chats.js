import {
  GET_CHATS,
  UNMATCH_USER,
  CREATE_USER,
  GET_MESSAGES,
} from '../constants/api_urls';
export const chats = {
  state: {
    userChats: [],
    singleChat: [],
    newUser: null,
    userMessages: {},
  }, // initial state
  reducers: {
    get_chats_success(state, {response}) {
      return {
        ...state,
        userChats: response,
      };
    },
    get_user_messages_success(state, {response}) {
      return {
        ...state,
        userMessages: response?.message,
      };
    },
    get_user_success(state, {response}) {
      return {
        ...state,
        newUser: response,
        userChats: response?.chat
          ? state.userChats.concat(response?.chat)
          : state.userChats,
      };
    },
    update_chats(state, {response}) {
      const chat = state.userChats.find(el => el.id === response.id);
      const chatIndex = state.userChats.indexOf(chat);
      state.userChats[chatIndex] = response;
    },
  },
  effects: dispatch => ({
    getChats() {
      return dispatch({
        type: 'chats/get_chats',
        request: {
          url: GET_CHATS,
          method: 'get',
          loader: true,
        },
      });
    },
    getUserMessages(props) {
      return dispatch({
        type: 'chats/get_user_messages',
        request: {
          url: GET_MESSAGES,
          method: 'post',
          data: {id: props},
          loader: true,
        },
      });
    },
    unmatchUser(props) {
      return dispatch({
        request: {
          url: UNMATCH_USER,
          data: props,
          method: 'post',
          loader: true,
        },
      });
    },
    getNewUser() {
      return dispatch({
        type: 'chats/get_user',
        request: {
          url: CREATE_USER,
          method: 'get',
          loader: true,
        },
      });
    },
    getUserSuccess() {
      return dispatch({
        type: 'chats/get_user_success',
        payload: {response: null},
      });
    },
    getUserMessagesSuccess() {
      return dispatch({
        type: 'chats/get_user_messages_success',
        payload: {response: null},
      });
    },
    updateChats(payload) {
      return dispatch({
        type: 'chats/update_chats',
        payload
      });
    },
  }),
};
