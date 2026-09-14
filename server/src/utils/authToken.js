import jwt from "jsonwebtoken";

const AUTH_COOKIE_NAME = "jobflow_token";

const createAuthToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters");
  }

  return jwt.sign({}, secret, {
    algorithm: "HS256",
    subject: userId.toString(),
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    issuer: "jobflow-api",
    audience: "jobflow-client",
  });
};

const setAuthCookie = (response, token) => {
  const configuredDays = Number(process.env.COOKIE_EXPIRES_DAYS);
  const expiryDays =
    Number.isFinite(configuredDays) && configuredDays > 0 ? configuredDays : 1;

  response.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: expiryDays * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

export { AUTH_COOKIE_NAME, createAuthToken, setAuthCookie };
