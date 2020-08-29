import {Consignment} from '@data';

export type AuthenticationStoryboardParamList = {
  SignIn: {userName?: string};
  ScanQR: undefined;
  ConsignmentDetail: {consignment: Consignment};
};
