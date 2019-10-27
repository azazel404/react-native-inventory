import {
  USER_SIGN,
  DELETE_USER,
  GETALL_USER,
  USER_SIGNOUT
} from '../../actions/type';
const INITIAL_STATE = {
  me: [],
  list: [],
  token: null,
  deletedUser: false
};

const user = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case USER_SIGN:
      return {
        ...state,
        me: action.payload.data,
        token: action.payload.token
      };
    case GETALL_USER:
      return {
        ...state,
        list: action.payload.user
      };
    case USER_SIGNOUT:
      return INITIAL_STATE;
    case DELETE_USER:
      return {
        ...state,
        deletedUser: true
      };
    default:
      return state;
  }
};
export default user;
