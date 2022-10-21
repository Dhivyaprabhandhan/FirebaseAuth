import {REGISTER} from '../CONSTATNTS/types';

export const registerAction = user => {
  console.log('userrrr-->', user);
  return {
    type: REGISTER,
    payload: user,
  };
};
