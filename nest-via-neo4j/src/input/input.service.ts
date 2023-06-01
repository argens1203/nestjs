import { NodeType } from '@argens1203/swap-model';
import { Injectable } from '@nestjs/common';

import { EntityNode } from '../node';

import { Command } from './commands';
import { NodeCommandHandler } from './handlers';
import {
  createSuccessResponse,
  createFailureResponse,
  RefObject,
} from './responses';
import { ResponseOptions } from './types';

@Injectable()
export class InputService {
  constructor(private readonly nodeCommandHandler: NodeCommandHandler) {}

  async handleCommands(inputs: Command<EntityNode>[]) {
    const promises = inputs.map((input) =>
      this.handleOneCommand(input)
        .then((args) => createSuccessResponse(...args))
        .catch(createFailureResponse),
    );
    return await Promise.all(promises);
  }

  async handleOneCommand(
    input: Command<EntityNode>,
  ): Promise<
    [EntityNode | RefObject<EntityNode> | EntityNode[], ResponseOptions]
  > {
    switch (input.nodeType) {
      case NodeType.ENTITY:
        return await this.nodeCommandHandler.handleNodeCommand(input);
    }
    return null;
  }
}
