import { INode, IQueryResponse, NodeType } from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { EntityNode } from '../../node';
import { Node } from '../entities';

import { Response } from './response.entity';

export class QueryResponse<T extends INode>
  extends Response
  implements IQueryResponse<T>
{
  @ValidateNested()
  @Type(() => Node, {
    discriminator: {
      property: 'nodeType',
      subTypes: [{ value: EntityNode, name: NodeType.ENTITY }],
    },
  })
  data: T;
}
