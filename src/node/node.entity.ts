import { PresentationConfig } from './types';
import { NodeType } from './types/node-type.enum';

export class NodeEntity {
  type: NodeType;

  data: string;

  presenetationConfig?: PresentationConfig = {};

  preferredPresentation?: string;

  ref: string;
}
