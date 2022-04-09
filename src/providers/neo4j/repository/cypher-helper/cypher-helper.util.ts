import { NotImplementedException } from '@nestjs/common';

import { Action } from './action.enum';
import { CREATE, RETURN, MATCH, DELETE } from './cypher-keywords.const';

export class CypherHelper {
  static getQueryString(input) {
    const { action, type, params = {} } = input;
    const [pre, post] = this.getActions(action);
    return `${pre} (a: ${type} ${this.parameterize(params)}) ${post} a`;
  }

  static getActions(action: Action): [string, string] {
    switch (action) {
      case Action.CREATE:
        return [CREATE, RETURN];
      case Action.READ:
        return [MATCH, RETURN];
      case Action.UPDATE:
        throw NotImplementedException;
      case Action.DELETE:
        return [MATCH, DELETE];
    }
  }

  static parameterize(obj: Record<string, any>) {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      return '';
    }
    const params = keys.map((key) => `${key}: $${key}`).join(', ');
    return `{${params}}`;
  }
}
