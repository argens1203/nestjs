import { CreateNodeDto } from '../../node/create-node.dto';
import { Actions } from '../enums/action.enum';

export type NodeCommand = CreateNodeDto;

export type ICommand = ActionInput & ICommandData;

type ActionInput = {
  action: Actions;
};

type ICommandData = {
  data: NodeCommand;
};
