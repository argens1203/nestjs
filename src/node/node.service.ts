import { Injectable } from '@nestjs/common';
import { generate as uuid } from 'short-uuid';

import { Node } from '../input/entities';
import { RepositoryService } from '../providers/neo4j/repository/repository.service';

import { CreateNodeDto } from './create-node.dto';

@Injectable()
export class NodeService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: CreateNodeDto) {
    const ref = uuid();
    const obj = { ...dto, ref };
    return await this.repositoryService.create(obj);
  }

  async getByRef(ref: string): Promise<Node> {
    const node = await this.repositoryService.get({ ref });
    return (node?.[0] as unknown as Node) || null;
  }

  async deleteByRef(ref: string) {
    return await this.repositoryService.delete({ ref });
  }

  async scan() {
    return await this.repositoryService.scan();
  }
}
