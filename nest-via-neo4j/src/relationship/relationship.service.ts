import { Injectable } from '@nestjs/common';
import { generate as uuid } from 'short-uuid';

import { RepositoryService } from '../providers/neo4j/repository/repository.service';

@Injectable()
export class RelationshipService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto) {
    const { data, type = 'TEXT', title = '' } = dto;
    const ref = uuid();
    const obj = { data, type: type.toUpperCase(), title, ref };
    return await this.repositoryService.create(obj);
  }

  async getByRef(ref: string) {
    return await this.repositoryService.get({ ref });
  }
}
