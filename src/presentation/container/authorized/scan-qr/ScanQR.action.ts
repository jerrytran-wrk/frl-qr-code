import {ScanQRStoreApi} from './ScanQR.type';
import {INITIAL_STATE} from './constants';
import {FirestoreConsignmentDataSource} from '@data';

export const ScanQRActions = {
  reset: () => ({setState}: ScanQRStoreApi) => {
    setState(INITIAL_STATE);
  },
  validate: (code: string) => async ({setState}: ScanQRStoreApi) => {
    if (code.includes('/')) {
      return false;
    }
    setState({isValidatingCode: true});
    const dataSource = new FirestoreConsignmentDataSource();
    const result = await dataSource.get(code);
    setState({isValidatingCode: false});
    return result.caseOf({right: () => true, left: () => false});
  },
};
