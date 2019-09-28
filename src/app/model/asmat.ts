import {Address} from './address';

export interface Asmat {
  _id: string;
  firstName: string;
  lastName: string;
  cellPhoneNumber: string;
  fixPhoneNumber: string;
  email: string;
  adherent: boolean;
  address: Address;
  joiningDate: Date;
  joiningEndDate: Date;
  remindDate: Date;
  receptions: number;
  availabilityCommunicated: boolean;
  babyAvailability: number;
  scholarAvailability: number;
}
