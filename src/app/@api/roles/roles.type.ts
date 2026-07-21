export namespace Role {
  export type Id = string;

  export interface Base {
    _id: Id;
    name: ERole;
    createdAt: string;
    updatedAt: string;
  }

  export enum ERole {
    admin = 'admin',
    clerk = 'clerk',
    user = 'user',
  }
}
