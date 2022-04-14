import { Injectable } from '@nestjs/common';

import { NodeService } from '../node/node.service';

import { Command } from './entities';
import { EntityType } from './enums';
import { Actions } from './enums/action.enum';

@Injectable()
export class InputService {
  constructor(private readonly nodeService: NodeService) {}

  async handleCommands(inputs: Command[]) {
    const promises = inputs.map((input) =>
      this.handleOneCommand(input)
        .then((args) => this.createSuccessResponse(...args))
        .catch(this.createFailureResponse.bind(this)),
    );
    return await Promise.all(promises);
  }

  async handleOneCommand(input: Command): Promise<[any, ResponseOptions]> {
    const { type, ref } = input;
    switch (type) {
      case EntityType.NODE:
        return [await this.handleNodeCommand(input), { ref }];
    }
    return null;
  }

  async handleNodeCommand(input: Command) {
    switch (input.action) {
      case Actions.CREATE:
        return await this.handleCreateNode(input);
      case Actions.SCAN:
        return await this.handleScanNode();
    }
    return null;
  }

  async handleCreateNode(input: Command) {
    return await this.nodeService.create(input.data);
  }

  async handleScanNode() {
    return await this.nodeService.scan();
  }

  createSuccessResponse(data: any, options: ResponseOptions = {}) {
    const { ref } = options;
    return {
      success: true,
      ref,
      data,
    };
  }

  createFailureResponse(e: Error) {
    return {
      success: false,
      error: e.name,
      message: e.message,
    };
  }
}

type ResponseOptions = {
  ref?: string;
};
