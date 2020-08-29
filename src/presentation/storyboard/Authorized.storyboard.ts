import {Distributor} from '@data';

export type AuthorizedStoryboardParamList = {
  DistributorList: undefined;
  ConsignmentAdding: {distributor: Distributor};
  ConsignmentList: {distributor: Distributor};
  DistributorAdding: undefined;
  ConsignmentDetail: {consignmentId: string};
  ConsignmentEditing: {consignmentId: string};
  ScanQR: undefined;
  DistributorEditing: {distributorId: string};
};
