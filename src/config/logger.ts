import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.errors({
      stack: true,
    }),

    winston.format.printf(
      ({ level, message, timestamp, stack }) => {
        return stack
          ? `[${timestamp}] ${level.toUpperCase()}: ${message}\n${stack}`
          : `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      }
    )
  ),

  transports: [
    new winston.transports.Console(),
  ],
});

export default logger;

// Usage example:
// import logger from './utils/logger';
// logger.info('This is an info message');
// logger.error('This is an error message', new Error('Example error'));
// logger.warn('This is a warning message');
