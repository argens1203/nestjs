import {
  Action,
  NodeType,
  ICreateCommand,
  INode,
} from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { Equals, ValidateNested } from 'class-validator';

import { NodeEntity } from '../../node';
import { Entity } from '../entities';

import { Command } from './command.entity';

export class CreateCommand<T extends INode>
  extends Command<T>
  implements ICreateCommand<T>
{
  @Equals(Action.CREATE)
  action: Action.CREATE;

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
