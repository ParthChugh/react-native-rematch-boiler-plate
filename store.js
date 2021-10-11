import {init} from '@rematch/core';
import apiMiddleware from './src/httpService/api';
import {coins} from './src/models/coins';
import {chats} from './src/models/chats';
import {user} from './src/models/user';
import {request} from './src/models/request';
import immerPlugin from '@rematch/immer';
import selectPlugin from '@rematch/select';
import subscriptionsPlugin from '@rematch/subscriptions';

const immer = immerPlugin();
const subscriptions = subscriptionsPlugin();
const select = selectPlugin();

const store = init({
  models: {
    coins,
    user,
    request,
    chats,
  },
  redux: {
    middlewares: [apiMiddleware],
  },
  plugins: [immer, subscriptions, select],
});

export default store;
