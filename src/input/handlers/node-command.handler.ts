import { Injectable } from '@nestjs/common';

import { NodeService } from '../../node/node.service';
import { Command } from '../entities';
import { Actions } from '../enums';
import { Resolution } from '../enums/resolution.enum';
import { ResponseOptions } from '../types';

@Injectable()
export class NodeCommandHandler {
  constructor(private readonly nodeService: NodeService) {}

  async handleNodeCommand(input: Command) {
    switch (input.action) {
      case Actions.CREATE:
        return await this.handleCreateNode(input);
      case Actions.SCAN:
        return await this.handleScanNode(input);
      case Actions.DELETE:
        return await this.handleDeleteNode(input);
    }
    return null;
  }

  async handleDeleteNode(input: Command): Promise<[any, ResponseOptions]> {
    await this.nodeService.deleteByRef(input.data.ref);
    return [
      { ref: input.data.ref },
      {
        resolution: Resolution.DELETED,
      },
    ];
  }

  async handleCreateNode(input: Command): Promise<[any, ResponseOptions]> {
    const node = await this.nodeService.create(input.data.toCreateNodeDto());
    return [node, { ref: input.ref, resolution: Resolution.CREATED }];
  }

  async handleScanNode(input: Command): Promise<[any, ResponseOptions]> {
    const nodes = await this.nodeService.scan();
    return [nodes, { ref: input.ref }];
  }
}
