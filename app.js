const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const authRoute = require('./routes/authRoute');
const todoRoute = require('./routes/todoRoute');

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMS: 15 * 60 * 1000, // 15 minutes
  limit: 50,
  message: {
    status: 'fail',
    message: 'Too many requests from this IP, please try again in 15 minutes',
  },
});

app.use(limiter);

app.use(mongoSanitize());

app.use(
  express.json({
    limit: '10kb',
  }),
);

app.use('/api/v1/users', authRoute);
app.use('/api/v1/todos', todoRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
