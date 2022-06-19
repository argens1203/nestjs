import { INode, IScanResponse, NodeType } from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { NodeEntity } from '../../node';
import { Entity } from '../entities';

import { Response } from './response.entity';

export class ScanResponse<T extends INode>
  extends Response
  implements IScanResponse<T>
{
  @ValidateNested()
  @Type(() => Entity, {
    discriminator: {
      property: 'nodeType',
      subTypes: [{ value: NodeEntity, name: NodeType.ENTITY }],
    },
  })
  data: T[];
}
