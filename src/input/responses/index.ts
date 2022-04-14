import { ResponseOptions } from '../types';

export function createSuccessResponse(
  data: any,
  options: ResponseOptions = {},
) {
  return {
    success: true,
    ...options,
    data,
  };
}

export function createFailureResponse(e: Error) {
  return {
    success: false,
    error: e.name,
    message: e.message,
  };
}
