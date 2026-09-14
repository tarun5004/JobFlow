import { registerUser } from "../services/authService.js";
import { setAuthCookie } from "../utils/authToken.js";
import sendSuccess from "../utils/sendResponse.js";

const register = async (request, response) => {
  const { token, user } = await registerUser(request.validatedBody);

  setAuthCookie(response, token);

  return sendSuccess(response, {
    statusCode: 201,
    message: "Account created successfully",
    data: {
      user: user.toJSON(),
    },
  });
};

export { register };
