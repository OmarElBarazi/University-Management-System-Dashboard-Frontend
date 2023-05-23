import {
  userCreateReducer,
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
} from './userReducer';

export default {
  userLogin: userLoginReducer,
  userList: userListReducer,
  userCreate: userCreateReducer,
  userDelete: userDeleteReducer,
};
