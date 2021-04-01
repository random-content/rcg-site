export interface CustomError extends Error {
  clientMessage?: string;
}

export function createError(name: string, message?: string): CustomError {
  const error: CustomError = new Error(name);
  if (message) {
    error.clientMessage = message;
  };

  return error;
}
