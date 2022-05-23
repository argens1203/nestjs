import {
  EntityType,
  ICreateResponse,
  IEntity,
  Resolution,
} from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { IsEnum, ValidateNested } from 'class-validator';

import { NodeEntity } from '../../node';
import { Entity } from '../entities';

import { Response } from './response.entity';

export class CreateResponse<T extends IEntity>
  extends Response
  implements ICreateResponse<T>
{
  @IsEnum(Resolution)
  resolution: Resolution;

  //TODO: Probably doesn't work
  @ValidateNested()
  @Type(() => Entity, {
    discriminator: {
      property: 'entityType',
      subTypes: [{ value: NodeEntity, name: EntityType.NODE }],
    },
  })
  data: T;
}
