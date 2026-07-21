import { State } from '../states/states.type';
import { Response } from '../../@common/types/ApiLayer.types';

export namespace District {
  export type Id = string;

  export interface Base {
    _id: Id;
    stateId: State.Id;
    name: string;
    createdAt: string;
    updated: string;
  }

  export type Detail = Omit<Base, 'stateId'> & {
    stateId: State.Base;
  };
  export type List = Detail[];

  export namespace Apis {
    export interface CreatePayload {
      stateId: string;
      name: string;
    }

    export interface SelectPayload {
      stateId: State.Id;
    }
    export type CreateResponse = Response.Normal<Detail>;
    export type ListResponse = Response.Paginated<Base>;
  }
}
