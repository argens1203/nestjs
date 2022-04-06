import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateNodeDto } from 'src/node/create-node.dto';
import { NodeType } from 'src/node/node-type.enum';
import { NodeEntity } from 'src/node/node.entity';
import { NodeService } from 'src/node/node.service';
import { Presentation } from 'src/node/presentation.enum';
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
    throw NotImplementedException;
  }
}
