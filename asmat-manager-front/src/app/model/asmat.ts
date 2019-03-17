import {Address} from './address';

export interface Asmat {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: Address;
}
