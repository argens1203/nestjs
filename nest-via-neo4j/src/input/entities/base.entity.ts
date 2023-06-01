import { NodeType, INode } from '@argens1203/swap-model';

export abstract class Node implements INode {
  nodeType: NodeType;

  ref: any;
}
