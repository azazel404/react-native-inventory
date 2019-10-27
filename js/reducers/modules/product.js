import { GETALLPRODUCT } from '../../actions/type';
const INITIAL_STATE = {
  list: []
};

const product = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case GETALLPRODUCT:
      return {
        ...state,
        list: action.payload.product
      };
    default:
      return state;
  }
};
export default product;
