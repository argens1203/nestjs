import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Actions, EntityType } from '../enums';
import { NodeCommand } from '../types/node-command.type';

import { CommandData } from './comand-data.entity';

// export type Input = NodeInput;

export class Command implements ICommand {
  @IsEnum(Actions)
  action: Actions;

  @IsEnum(EntityType)
  type: EntityType;

  @IsString()
  @IsOptional()
  ref?: string;

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
