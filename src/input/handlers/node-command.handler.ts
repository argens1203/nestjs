import { Action, Resolution } from '@argens1203/swap-model';
import { Injectable } from '@nestjs/common';

import { NodeEntity } from '../../node';
import { CreateNodeDto } from '../../node/create-node.dto';
import { NodeService } from '../../node/node.service';
import {
  Command,
  CreateCommand,
  DeleteCommand,
  ScanCommand,
} from '../commands';
import { ResponseOptions } from '../types';

@Injectable()
export class NodeCommandHandler {
  constructor(private readonly nodeService: NodeService) {}

  async handleNodeCommand(input: Command<NodeEntity>) {
    switch (input.action) {
      case Action.CREATE:
        return await this.handleCreateNode(input as CreateCommand<NodeEntity>);
      case Action.SCAN:
        return await this.handleScanNode(input as ScanCommand<NodeEntity>);
      case Action.DELETE:
        return await this.handleDeleteNode(input as DeleteCommand<NodeEntity>);
    }
    return null;
  }

  async handleDeleteNode(
    input: DeleteCommand<NodeEntity>,
  ): Promise<[any, ResponseOptions]> {
    await this.nodeService.deleteByRef(input.data.ref);
    return [
      { ref: input.data.ref },
      {
        resolution: Resolution.DELETED,
      },
    ];
  }

  async handleCreateNode(
    input: CreateCommand<NodeEntity>,
  ): Promise<[any, ResponseOptions]> {
    const dto = new CreateNodeDto({
      type: input.data.type,
      data: input.data.data,
    });
    const node = await this.nodeService.create(dto);
    return [node, { ref: input.ref, resolution: Resolution.CREATED }];
  }

  async handleScanNode(
    input: ScanCommand<NodeEntity>,
  ): Promise<[any, ResponseOptions]> {
    const nodes = await this.nodeService.scan();
    return [nodes, { ref: input.ref }];
  }
}
