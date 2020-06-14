const CLEAR = "session/CLEAR";
const SET = "session/SET";
const defaultState = null;

// action
export const setSession = (session) => {
  return {
    type: SET,
    session,
  };
};

export const clearSession = () => {
  return {
    type: CLEAR,
  };
};

// reducer
const sessionReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case SET:
      return action.session;
    case CLEAR:
      return null;
    default:
      return state;
  }
};

export default sessionReducer;
