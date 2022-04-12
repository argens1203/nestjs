import { Injectable } from '@nestjs/common';
import { generate as uuid } from 'short-uuid';

import { NodeService } from '../node/node.service';
import { RepositoryService } from '../providers/neo4j/repository/repository.service';

import { Actions } from './action.enum';
import { Command } from './command.entity';

@Injectable()
export class InputService {
  constructor(private readonly nodeService: NodeService) {}

  async handleCommands(inputs: Command[]) {
    return await Promise.all(inputs.map(this.handleOneCommand.bind(this)));
  }

  async handleOneCommand(input: Command) {
    switch (input.action) {
      case Actions.CREATE:
        return await this.handleCreate(input);
    }
    return null;
  }

  async handleCreate(input: Command) {
    try {
      const nodeEntity = await this.nodeService.create(input.data);
      return this.createSuccessResponse(nodeEntity);
    } catch (e) {
      return this.createFailureResponse(e);
    }
  }

  createSuccessResponse(input: any) {
    return {
      success: true,
      data: input,
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
