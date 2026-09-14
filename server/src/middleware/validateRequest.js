const validateBody = (schema) => (request, _response, next) => {
  const result = schema.safeParse(request.body);

  if (!result.success) {
    return next(result.error);
  }

  request.validatedBody = result.data;
  return next();
};

export default validateBody;
