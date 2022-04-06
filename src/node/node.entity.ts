import { NodeType } from './node-type.enum';
import { PresentationConfig } from './presentation-config.type';

export class NodeEntity {
  type: NodeType;

  data: string;

  presenetationConfig?: PresentationConfig = {};

  preferredPresentation?: string;

  ref: string;
}
