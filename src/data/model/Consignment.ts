import {Distributor} from './Distributor';

export interface Consignment {
  id: string;
  distributor?: Distributor;
  distributorId: string;
  name: string;
  shipper: string;
  createdDate: string;
  createdAt: string;
}

export type ConsignmentAddingData = {
  name: string;
  shipper: string;
  distributorId: string;
  createdDate: string;
};

export type ConsignmentEditingData = {
  name?: string;
  shipper?: string;
  distributorId?: string;
  createdDate?: string;
};
