import {
  RequestRef,
  ICommand,
  Action,
  INode,
  NodeType,
} from '@argens1203/swap-model';
import { Allow, IsOptional, IsString } from 'class-validator';
import { IsEnum } from 'class-validator';

export class Command<T extends INode> implements ICommand<T> {
  @IsEnum(Action)
  action: Action;

  @IsString()
  @IsOptional()
  ref?: RequestRef;

  @IsEnum(NodeType)
  type: T['nodeType'];

  @Allow()
  data?: T | T[];
}
