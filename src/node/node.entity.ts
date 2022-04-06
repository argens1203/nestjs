import { NodeType } from './types/node-type.enum';
import { PresentationConfig } from './types';

export class NodeEntity {
  type: NodeType;

  data: string;

  presenetationConfig?: PresentationConfig = {};

  preferredPresentation?: string;

  ref: string;
}
