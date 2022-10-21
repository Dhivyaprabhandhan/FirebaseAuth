import {REGISTER} from '../CONSTATNTS/types';

const initialState = {
  users: [],
};
export const usersReducer = (state = initialState, action) => {
  console.log('stateeee-->111', state);
  switch (action.type) {
    case REGISTER:
      return [
        ...state.users,
        {email: action.payload.email, password: action.payload.password},
      ];
    default:
      return state;
  }
};
