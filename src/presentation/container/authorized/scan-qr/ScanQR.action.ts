import {ScanQRStoreApi} from './ScanQR.type';
import {INITIAL_STATE} from './constants';
import {FirestoreConsignmentDataSource} from '@data';

export const ScanQRActions = {
  reset: () => ({setState}: ScanQRStoreApi) => {
    setState(INITIAL_STATE);
  },
  validate: (code: string) => async ({setState}: ScanQRStoreApi) => {
    try {
      const data = JSON.parse(code);
      if (!data.id || `${data.id}`.includes('/')) {
        return false;
      }
      setState({isValidatingCode: true});
      const dataSource = new FirestoreConsignmentDataSource();
      const result = await dataSource.get(data.id);
      setState({isValidatingCode: false});
      return result.caseOf({right: () => true, left: () => false});
    } catch (error) {
      return false;
    }
  },
};
