export interface ConfigError {
  name: string;
  message: string;
  statusCode: number;
  details?: string;
}

export const errors: { [errorName: string]: ConfigError } = {
  NotFoundError: {
    name: 'NotFoundError',
    message: 'The requested resource was not found',
    statusCode: 404
  },
  InternalServerError: {
    name: 'InternalServerError',
    message: 'Something went wrong on our end. Sorry about that',
    statusCode: 500
  }
};
