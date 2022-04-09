import { Injectable, NotImplementedException } from '@nestjs/common';

import { CreateNodeDto } from '../../node/create-node.dto';
import { NodeEntity } from '../../node/node.entity';
import { NodeService } from '../../node/node.service';
import { Presentation, NodeType } from '../../node/types';

import { CreateSketchDto } from './create-sketch.dto';

@Injectable()
export class SketchService {
  constructor(private readonly nodeService: NodeService) {}

  async create(dto: CreateSketchDto) {
    const obj: CreateNodeDto = {
      ...dto,
      type: NodeType.STRING,
      preferredPresentation: Presentation.SKETCH,
    };
    return await this.nodeService.create(obj);
  }

  async getByRef(ref: string) {
    return await this.nodeService.getByRef(ref);
  }

  async deleteByRef(ref: string) {
    return await this.nodeService.deleteByRef(ref);
  }

  async scan(): Promise<NodeEntity[]> {
    const res = await this.nodeService.scan();
    return res.filter(
      (res) => res.preferredPresentation === Presentation.SKETCH,
    );
  }
}
