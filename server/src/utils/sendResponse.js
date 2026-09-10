const sendSuccess = (
  response,
  {
    statusCode = 200,
    message = "Success",
    data = null,
    meta,
  } = {},
) => {
  const body = {
    success: true,
    message,
    data,
  };

  if (meta !== undefined) {
    body.meta = meta;
  }

  return response.status(statusCode).json(body);
};

export default sendSuccess;