const defaultState = {
  username: '',
  email: '',
  password: '',
  inProgress: false,
  errors: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD_AUTH':
      return {
        ...state,
        [action.key]: action.value
      };
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case 'ASYNC_START':
      if (action.subtype === 'LOGIN' || action.subtype === 'REGISTER') {
        return {
          ...state,
          inProgress: true
        };
      }
      break;
    case 'LOGIN_PAGE_UNLOADED':
      return {};
    default:
      return state;
  }
  return state;
}