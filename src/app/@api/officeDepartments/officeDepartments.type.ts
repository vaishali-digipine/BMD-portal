import { Department } from '../departments/departments.type';
import { Office } from '../offices/offices.type';

export namespace OfficeDepartment {
  export interface Detail {
    _id: string;

    officeId: Office.Detail;

    departmentId: Department.Base;
  }

  export namespace Apis {
    export interface GetByIdResponse {
      message: string;

      data: Detail;
    }
  }
}
