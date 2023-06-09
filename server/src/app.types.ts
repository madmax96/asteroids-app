import { ApiProperty } from '@nestjs/swagger';

export enum ERROR_HTTP_STATUS {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export class HttpError {
  @ApiProperty({ enum: ERROR_HTTP_STATUS, enumName: 'ERROR_HTTP_STATUS' })
  statusCode: ERROR_HTTP_STATUS;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;

  constructor(
    statusCode: ERROR_HTTP_STATUS,
    message: string | string[],
    error: string,
  ) {
    this.statusCode = statusCode;
    this.message = Array.isArray(message) ? message : [message];
    this.error = error;
  }
}
