import {Address} from './address';

export interface Asmat {
  id: number;
  firstName: string;
  lastName: string;
  cellPhoneNumber: string;
  fixPhoneNumber: string;
  email: string;
  adherent: boolean;
  address: Address;
  joiningDate: Date;
  remindDate: Date;
  receptions: number;
}
