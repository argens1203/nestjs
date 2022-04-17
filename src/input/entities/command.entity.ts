import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Actions, EntityType } from '../enums';

import { CommandData } from './comand-data.entity';

// export type Input = NodeInput;

export class Command implements ICommand {
  @IsEnum(Actions)
  @ApiProperty()
  action: Actions;

  @IsEnum(EntityType)
  @ApiProperty()
  type: EntityType;

  @IsString()
  @ApiProperty()
  @IsOptional()
  ref?: string;

  @ValidateNested({ each: true })
  @Type(() => CommandData)
  @ApiProperty()
  data: CommandData;
}

type ICommand = ActionInput & ICommandData;

type ActionInput = {
  action: Actions;
};

type ICommandData = {
  data: CommandData;
};
