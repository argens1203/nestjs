import { EntityType } from '@argens1203/swap-model';
import { Injectable } from '@nestjs/common';

import { NodeEntity } from '../node';

import { Command } from './commands';
import { NodeCommandHandler } from './handlers';
import { createSuccessResponse, createFailureResponse } from './responses';
import { ResponseOptions } from './types';

@Injectable()
export class InputService {
  constructor(private readonly nodeCommandHandler: NodeCommandHandler) {}

  async handleCommands(inputs: Command<NodeEntity>[]) {
    const promises = inputs.map((input) =>
      this.handleOneCommand(input)
        .then((args) => createSuccessResponse(...args))
        .catch(createFailureResponse),
    );
    return await Promise.all(promises);
  }

  async handleOneCommand(
    input: Command<NodeEntity>,
  ): Promise<[any, ResponseOptions]> {
    switch (input.type) {
      case EntityType.NODE:
        return await this.nodeCommandHandler.handleNodeCommand(input);
    }
    return null;
  }
}
