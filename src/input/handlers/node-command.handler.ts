import { Action, NodeType, Resolution } from '@argens1203/swap-model';
import { Injectable } from '@nestjs/common';

import { EntityNode } from '../../node';
import { CreateNodeDto } from '../../node/create-node.dto';
import { NodeService } from '../../node/node.service';
import {
  Command,
  CreateCommand,
  DeleteCommand,
  ScanCommand,
} from '../commands';
import { RefObject } from '../responses';
import { ResponseOptions } from '../types';

@Injectable()
export class NodeCommandHandler {
  constructor(private readonly nodeService: NodeService) {}

  async handleNodeCommand(input: Command<EntityNode>) {
    switch (input.action) {
      case Action.CREATE:
        return await this.handleCreateNode(input as CreateCommand<EntityNode>);
      case Action.SCAN:
        return await this.handleScanNode(input as ScanCommand<EntityNode>);
      case Action.DELETE:
        return await this.handleDeleteNode(input as DeleteCommand<EntityNode>);
    }
    return null;
  }

  async handleDeleteNode(
    input: DeleteCommand<EntityNode>,
  ): Promise<[RefObject<EntityNode>, ResponseOptions]> {
    await this.nodeService.deleteByRef(input.data.ref);
    return [
      { ref: input.data.ref },
      {
        resolution: Resolution.DELETED,
        nodeType: NodeType.ENTITY,
      },
    ];
  }

  async handleCreateNode(
    input: CreateCommand<EntityNode>,
  ): Promise<[EntityNode, ResponseOptions]> {
    const dto = new CreateNodeDto({
      dataType: input.data.dataType,
      data: input.data.data,
    });
    const node = await this.nodeService.create(dto);
    return [
      node,
      {
        ref: input.ref,
        resolution: Resolution.CREATED,
        nodeType: NodeType.ENTITY,
      },
    ];
  }

  async handleScanNode(
    input: ScanCommand<EntityNode>,
  ): Promise<[EntityNode[], ResponseOptions]> {
    const nodes = await this.nodeService.scan();
    return [nodes, { ref: input.ref, nodeType: NodeType.ENTITY }];
  }
}
