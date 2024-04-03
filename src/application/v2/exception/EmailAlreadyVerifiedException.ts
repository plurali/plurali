import { ApiError } from '../dto/response/errors';
import { ApiException } from './ApiException';

export class EmailAlreadyVerifiedException extends ApiException {
  constructor(error = ApiError.EmailAlreadyVerified, status = 400) {
    super(error, status);
  }
}
