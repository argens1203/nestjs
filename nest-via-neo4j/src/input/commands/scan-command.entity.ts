import { Action, IScanCommand, INode } from '@argens1203/swap-model';
import { Equals } from 'class-validator';

import { Command } from './command.entity';

export class ScanCommand<T extends INode>
  extends Command<T>
  implements IScanCommand<T>
{
  @Equals(Action.SCAN)
  action: Action.SCAN;
}
