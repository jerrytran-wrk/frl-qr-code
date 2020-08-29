import {Distributor, Consignment} from '@data';

export type AuthorizedStoryboardParamList = {
  DistributorList: undefined;
  ConsignmentAdding: {distributor: Distributor};
  ConsignmentList: {distributor: Distributor};
  DistributorAdding: undefined;
  ConsignmentDetail: {consignment: Consignment};
  ScanQR: undefined;
};
