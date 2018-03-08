const defaultState = {
  inProgress: false,
  errors: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SETTINGS_SAVED':
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors: null
      };
    case 'ASYNC_START':
      return {
        ...state,
        inProgress: true
      };
    default:
      return state;
  }
}