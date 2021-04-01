import { NextFunction, Request, Response } from "express";
import { CustomError } from './create-error';
import { ConfigError, errors } from './errors';

function getConfigError(errorName: string): ConfigError {
  const configError = errors[errorName];

  if (configError) {
    return { ...configError };
  }

  return { ...errors['InternalServerError'] }
}

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
  const configError = getConfigError(err.message);
  res.status(configError.statusCode);

  if (err.clientMessage) {
    configError.details = err.clientMessage;
  }

  res.json(configError);

  return res;
}
