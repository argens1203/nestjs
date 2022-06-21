import { NodeType, RequestRef, Resolution } from '@argens1203/swap-model';

export type ResponseOptions = {
  ref?: RequestRef;
  resolution?: Resolution;
  nodeType: NodeType;
};
