import { Response } from 'express';
import { createLogger, format, transports } from 'winston';

const printRed = (text: string) => {
  console.log('\x1b[31m%s\x1b[0m', text);
};

const logger = createLogger({
  transports: [
    new transports.File({
      filename: './logs/index.log',
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => `${info.timestamp} ${info.level} : ${info.message} `),
      ),
    }),
  ],
});

const isEmpty = (data: any) => {
  return (
    !data ||
    data.length === 0 ||
    typeof data == 'undefined' ||
    data == null ||
    Object.keys(data).length == 0
  );
};

const handleError = (res: Response, message: string, statusCode: number = 400) => {
  logger.log({
    level: 'error',
    message: message,
  });
  return res.status(statusCode).json({
    status: false,
    message: message,
  });
};

const handleSuccess = (res: Response, message: string, data = {}, statusCode: number = 200) => {
  logger.log({
    level: 'info',
    message: message,
  });
  return res.status(statusCode).json({
    status: true,
    message: message,
    data: { ...data },
  });
};

const generateCode = (number: number = 15) => {
  const dateString = Date.now().toString(36);
  const randomString = Math.random()
    .toString(36)
    .substring(2, number + 2);
  let result = randomString + dateString;
  result = result.length > number ? result.substring(0, number) : result;
  return result.toUpperCase();
};

const Utility = {
  printRed,
  handleError,
  handleSuccess,
  generateCode,
  isEmpty,
};

export default Utility;
