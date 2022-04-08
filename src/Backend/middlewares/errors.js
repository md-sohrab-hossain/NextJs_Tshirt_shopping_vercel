import ErrorHandler from '../utils/errorHandler';

export default (err, req, res) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;

  //!handling wrong mongoose object id error
  if (err.name == 'CastError') {
    const message = `Resource not found ${err.path}`;
    error = new ErrorHandler(message, 400);
  }

  //!handling mongoose validation error
  if (err.name == 'ValidationError') {
    const message = String(Object.values(err.errors).map(value => value.message));
    error = new ErrorHandler(message, 400);
  }

  //* API response
  res.status(err.statusCode).json({
    success: false,
    error,
    message: error.message,
    stack: error.stack,
  });
};
