import {
  Action,
  NodeType,
  ICreateCommand,
  INode,
} from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { Equals, ValidateNested } from 'class-validator';

import { EntityNode } from '../../node';
import { Node } from '../entities';

import { Command } from './command.entity';

export class CreateCommand<T extends INode>
  extends Command<T>
  implements ICreateCommand<T>
{
  @Equals(Action.CREATE)
  action: Action.CREATE;

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
