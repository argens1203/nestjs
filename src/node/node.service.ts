import { Injectable } from '@nestjs/common';
import { generate as uuid } from 'short-uuid';
import { RepositoryService } from 'src/repository/repository.service';
import { CreateNodeDto } from './create-node.dto';

@Injectable()
export class NodeService {
  constructor(private readonly repositoryService: RepositoryService) {}

  async create(dto: CreateNodeDto) {
    const { data, type = 'TEXT', title = '', ref: _ref } = dto;
    const ref = _ref ?? uuid();
    const obj = { data, type: type.toUpperCase(), title, ref };
    return await this.repositoryService.create(obj);
  }

  async getByTitle(title: string) {
    return await this.repositoryService.get({ title });
  }

  async getByRef(ref: string) {
    return await this.repositoryService.get({ ref });
  }

  async deleteByRef(ref: string) {
    return await this.repositoryService.delete({ ref });
  }

  async scan() {
    return await this.repositoryService.scan();
  }
}
