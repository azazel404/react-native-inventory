import { OPEN_DRAWER, CLOSE_DRAWER } from '../../actions/drawer';

const INITIAL_STATE = {
  drawerState: 'closed',
  drawerDisabled: false
};

const drawer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, drawerState: 'open' };
    case CLOSE_DRAWER:
      return { ...state, drawerState: 'close' };
    default:
      return state;
  }
};

export default drawer;
