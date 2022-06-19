import {
  ICreateResponse,
  INode,
  NodeType,
  Resolution,
} from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';

import { NodeEntity } from '../../node';
import { Entity } from '../entities';

import { Response } from './response.entity';

export class CreateResponse<T extends INode>
  extends Response
  implements ICreateResponse<T>
{
  @IsEnum(Resolution)
  resolution: Resolution;

  //TODO: Probably doesn't work
  @ValidateNested()
  @Type(() => Entity, {
    discriminator: {
      property: 'nodeType',
      subTypes: [{ value: NodeEntity, name: NodeType.ENTITY }],
    },
  })
  data: T;
}
