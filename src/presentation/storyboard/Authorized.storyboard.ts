import {ParamListBase} from '@react-navigation/native';
import {Distributor} from '@data';

export interface AuthorizedStoryboardParamList extends ParamListBase {
  DistributorList: undefined;
  ConsignmentAdding: {distributor: Distributor};
  ConsignmentList: {distributor: Distributor};
  DistributorAdding: undefined;
  ConsignmentDetail: {consignmentId: string};
}
