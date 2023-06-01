import {
  ICreateResponse,
  INode,
  NodeType,
  Resolution,
} from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';

import { EntityNode } from '../../node';
import { Node } from '../entities';

import { Response } from './response.entity';

export class CreateResponse<T extends INode>
  extends Response
  implements ICreateResponse<T>
{
  @IsEnum(Resolution)
  resolution: Resolution;

  //TODO: Probably doesn't work
  @ValidateNested()
  @Type(() => Node, {
    discriminator: {
      property: 'nodeType',
      subTypes: [{ value: EntityNode, name: NodeType.ENTITY }],
    },
  })
  data: T;
}
