import axios from 'axios';
import queryString from 'qs';
import humps from 'humps';
// import { LOADING, LOADING_COMPLETE } from '../request'
import {setIn} from 'immutable';

const debounceTimers = {};
const buildUrl = ({method = 'get', url, data, tableConfig}) => {
  if (method !== 'get') {
    return url;
  }
  const normalizedData = humps.decamelizeKeys({
    ...dataFromTableConfig(tableConfig),
    ...data,
  });

  return `${url}?${queryString.stringify(normalizedData, {
    arrayFormat: 'bracket',
  })}`;
};

// Sends data in the format required by ransack gem
const dataFromTableConfig = tableConfig => {
  if (!tableConfig) {
    return {};
  }

  const data = {filters: tableConfig.filters || {}, page: tableConfig.page};
  if (!tableConfig.sort) {
    return data;
  }
  return setIn(
    data,
    ['filters', 's'],
    `${tableConfig.sort.columnName} ${tableConfig.sort.order}`,
  );
};

const buildOptions = ({options: options = {}}) => ({
  ...options,
  headers: {
    ...options.headers,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const apiMiddleware = () => next => action => {
  if (!action || !action.request) {
    return next(action);
  }

  const {
    request,
    request: {
      method: method = 'get',
      data = {},
      loader,
      camelize = true,
      decamelize = true,
    },
  } = action;
  const REQUEST = `${action.type}_loading`;
  const SUCCESS = `${action.type}_success`;
  const FAILURE = `${action.type}_failure`;

  next({...action, type: REQUEST});
  if (loader) {
    next({type: 'request/loading', payload: {actionName: action.type}});
  }

  const processApi = () => {
    axios
      .request({
        method,
        url: buildUrl(request),
        data:
          data instanceof FormData || !decamelize
            ? data
            : humps.decamelizeKeys(data),
        ...buildOptions(request),
        responseType: 'json',
        withCredentials: true,
      })
      .then(({data}) => {
        next({
          type: SUCCESS,
          payload: {
            response: camelize ? humps.camelizeKeys(data) : data,
            requestAction: action,
          },
        });
      })
      .catch(error => {
        const errors = humps.camelizeKeys(error.response.data.errors);
        next({type: FAILURE, errors: humps.camelizeKeys(errors)});
        throw errors;
      })
      .finally(() => {
        if (loader) {
          next({type: 'request/loaded', payload: {actionName: action.type}});
        }
      });
  };

  if (!request.debounce) {
    return processApi();
  }

  if (debounceTimers[action.type]) {
    clearTimeout(debounceTimers[action.type]);
  }
  debounceTimers[action.type] = setTimeout(processApi, request.debounce);
  return debounceTimers[action.type];
};

export default apiMiddleware;
