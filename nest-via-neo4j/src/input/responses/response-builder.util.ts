import { NodeType } from '@argens1203/swap-model';

import { ResponseOptions } from '../types';

export function createSuccessResponse(
  data: any,
  options: ResponseOptions = { nodeType: NodeType.ENTITY },
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
