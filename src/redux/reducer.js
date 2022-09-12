const data = {
  userDetail: {},

  deviceInfo: {
    id: '',
    token: '',
    model: '',
    os: '',
  },
};
const reducer = (state = data, action) => {
  switch (action.type) {
    case 'setUserDetail':
      return {
        ...state,
        userDetail: action.payload,
        isLogin: true,
      };
    default:
      return state;
  }
};
export default reducer;
