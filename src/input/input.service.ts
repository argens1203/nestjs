import { Injectable } from '@nestjs/common';

import { Command } from './entities';
import { EntityType } from './enums';
import { NodeCommandHandler } from './handlers';
import { createSuccessResponse, createFailureResponse } from './responses';
import { ResponseOptions } from './types';

@Injectable()
export class InputService {
  constructor(private readonly nodeCommandHandler: NodeCommandHandler) {}

  async handleCommands(inputs: Command[]) {
    const promises = inputs.map((input) =>
      this.handleOneCommand(input)
        .then((args) => createSuccessResponse(...args))
        .catch(createFailureResponse),
    );
    return await Promise.all(promises);
  }

  async handleOneCommand(input: Command): Promise<[any, ResponseOptions]> {
    switch (input.type) {
      case EntityType.NODE:
        return await this.nodeCommandHandler.handleNodeCommand(input);
    }
    return null;
  }
}
