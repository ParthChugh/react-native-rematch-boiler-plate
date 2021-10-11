export const request = {
  // name: 'request',
  state: [], // will hold the actionName say 'user/update_user_success'
  reducers: {
    // actionName can be 'user/update_user_success' or any api action name
    loading(state, {actionName}) {
      return [...state, actionName];
    },
    loaded(state, {actionName}) {
      return state.filter(function (item) {
        return item !== actionName;
      });
    },
  },
  // Check https://rematchjs.org/docs/plugins/select/
  selectors: (slice, createSeclector, hasProps) => ({
    isActionLoading: hasProps(function (models, actionName) {
      return slice(request => request.includes(actionName));
    }),
  }),
};
