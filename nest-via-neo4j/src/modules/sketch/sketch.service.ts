import { DataType, Presentation } from '@argens1203/swap-model';
import { Injectable } from '@nestjs/common';

import { CreateNodeDto } from '../../node/create-node.dto';
import { EntityNode } from '../../node/entity-node';
import { NodeService } from '../../node/node.service';

import { CreateSketchDto } from './create-sketch.dto';

@Injectable()
export class SketchService {
  constructor(private readonly nodeService: NodeService) {}

  async create(dto: CreateSketchDto) {
    const obj = new CreateNodeDto({
      ...dto,
      dataType: DataType.STRING,
      preferredPresentation: Presentation.SKETCH,
    });
    return await this.nodeService.create(obj);
  }

  async getByRef(ref: string): Promise<EntityNode | null> {
    const node = await this.nodeService.getByRef(ref);
    if (node instanceof EntityNode) {
      return node;
    } else {
      return null;
    }
  }

  async deleteByRef(ref: string) {
    return await this.nodeService.deleteByRef(ref);
  }

  async scan(): Promise<EntityNode[]> {
    const res = await this.nodeService.scan();
    return res.filter(
      (res) => res.preferredPresentation === Presentation.SKETCH,
    );
  }
}
