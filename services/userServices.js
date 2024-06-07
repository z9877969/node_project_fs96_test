import { User } from '../model/user.js';
// import { createJWT, createRefresh } from '../middlewares/isValidJWT.js';
import 'dotenv/config';

export const findUserByToken = async (token) => {
  const user = await User.findOne({ accessToken: token });
  return user;
};

export const updateUserData = async (id, userData) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { ...userData },
    { new: true }
  );
  return updatedUser;
};
