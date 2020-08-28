import {Distributor} from './Distributor';

export interface Consignment {
  id: number;
  distributor: Distributor;
  name: string;
  shipper: string;
  createdDate: Date;
}
