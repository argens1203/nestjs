import { IsEnum, IsString } from 'class-validator';

import { NodeType } from '../../node/types';
import { NodeCommand } from '../types/node-command.type';

export class CommandData implements NodeCommand {
  @IsEnum(NodeType)
  type: NodeType;

  @IsString()
  data: string;
}
