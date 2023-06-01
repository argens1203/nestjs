import {
  Action,
  NodeType,
  IDeleteCommand,
  INode,
} from '@argens1203/swap-model';
import { Type } from 'class-transformer';
import { Equals, ValidateNested } from 'class-validator';

import { EntityNode } from '../../node';
import { Node } from '../entities';

import { Command } from './command.entity';

export class DeleteCommand<T extends INode>
  extends Command<T>
  implements IDeleteCommand<T>
{
  @Equals(Action.DELETE)
  action: Action.DELETE;

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
