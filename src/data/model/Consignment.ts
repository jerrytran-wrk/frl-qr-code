import {Distributor} from './Distributor';

export interface Consignment {
  id: string;
  distributor?: Distributor;
  distributorId: string;
  name: string;
  shipper: string;
  createdDate: Date;
  createdAt: Date;
}
