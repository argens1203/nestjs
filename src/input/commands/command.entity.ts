import {
  RequestRef,
  ICommand,
  Action,
  IEntity,
  EntityType,
} from '@argens1203/swap-model';
import { Allow, IsOptional, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';

export class Command<T extends IEntity> implements ICommand<T> {
  @IsEnum(Action)
  action: Action;

  @IsString()
  @IsOptional()
  ref?: RequestRef;

  @IsEnum(EntityType)
  type: T['entityType'];

  @Allow()
  data?: T | T[];
}
