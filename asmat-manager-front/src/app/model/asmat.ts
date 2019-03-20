import {Address} from './address';

export interface Asmat {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  adherent: boolean;
  address: Address;
  deadlineDate: Date;
  remindDate: Date;
  receptions: number;
}
