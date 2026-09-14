import User from "../models/User.js";
import { createAuthToken } from "../utils/authToken.js";

const registerUser = async (userData) => {
  const user = new User(userData);
  const token = createAuthToken(user.id);

  await user.save();

  return { token, user };
};

export { registerUser };
