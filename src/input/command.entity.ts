import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';

import { CreateNodeDto } from '../node/create-node.dto';
import { NodeType } from '../node/types';

import { Actions } from './action.enum';

// export type Input = NodeInput;

class CommandData implements NodeCommand {
  @IsEnum(NodeType)
  type: NodeType;

  @IsString()
  data: string;
}

export class Command implements ICommand {
  @IsEnum(Actions)
  action: Actions;

  @ValidateNested({ each: true })
  @Type(() => CommandData)
  data: CommandData;
}

type ICommand = ActionInput & ICommandData;

type ActionInput = {
  action: Actions;
};

type ICommandData = {
  data: NodeCommand;
};

type NodeCommand = CreateNodeDto;
