import { ApiError } from '../dto/response/errors';
import { ApiException } from './ApiException';

export class EmailVerificationRatelimitedException extends ApiException {
  constructor(error = ApiError.EmailVerificationRatelimited, status = 400) {
    super(error, status);
  }
}
