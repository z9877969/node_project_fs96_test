import HttpError from '../helpers/HttpError.js';
import { findUserByToken, updateUserData } from '../services/userServices.js';

export const userCurrent = async (req, res, next) => {
  const { token } = req.user;
  try {
    const user = await findUserByToken(token);
    const { name, email, gender, weight, time, waterRate, avatarURL } = user;

    if (!user) {
      throw HttpError(401, 'User doesn`t exist');
    }

    res.status(200).json({
      name,
      email,
      gender,
      weight,
      time,
      waterRate,
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export const userUpdate = async (req, res, next) => {
  const { id } = req.user;
  const data = req.body;
  try {
    if (req.file) {
      const avatarURL = req.file.path;
      var user = await updateUserData(id, { data, avatarURL });
    } else {
      var user = await updateUserData(id, data);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
