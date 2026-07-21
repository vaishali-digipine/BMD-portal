export namespace Aadhar {
  export type Id = string;

  export interface Base {
    _id: Id;
    aadharNumber: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    contact: string;
    dob: Date;
    gender: EGender;
    photo: string;
    address: {
      street: string;
      city: string;
      taluka: string;
      district: string;
      state: string;
      pinCode: string;
    };
    createdAt: string;
    updated: string;
  }

  export interface Detail extends Base {}

  export namespace Apis {
    export interface RequestOtpPayload {
      aadharNumber: string;
    }

    export type RequestOtpResponse = {
      message: string;
    };

    export interface VerifyOtpPayload {
      aadharNumber: string;
      otpNumber: string | null;
    }

    export type VerifyOtpResponse = {
      verificationToken: string;

      data: Aadhar.Detail;
    };
  }

  export enum EGender {
    male = 'male',
    female = 'female',
    other = 'other',
  }
}
