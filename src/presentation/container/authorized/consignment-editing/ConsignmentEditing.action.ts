import {ConsignmentEditingStoreApi} from './ConsignmentEditing.type';
import {INITIAL_STATE} from './constants';
import {
  FirestoreDistributorDataSource,
  FirestoreConsignmentDataSource,
  ConsignmentEditingData,
} from '@data';
import {KeyValuePair} from '@components';

export const ConsignmentEditingActions = {
  reset: () => ({setState}: ConsignmentEditingStoreApi) => {
    setState(INITIAL_STATE);
  },
  edit: () => async ({
    setState,
    getState,
  }: ConsignmentEditingStoreApi): Promise<void> => {
    const {editingData, consignment} = getState();
    setState({isEditing: true});
    const dataSource = new FirestoreConsignmentDataSource();
    const result = await dataSource.edit(consignment!.id, editingData);
    setState({isEditing: false});
    return result.caseOf({
      right: (r) => r,
      left: () => {
        setState({editingError: 'Chỉnh sửa lô hàng thất bại!'});
      },
    });
  },
  loadDistributor: () => async ({setState}: ConsignmentEditingStoreApi) => {
    setState({isLoadingDistributor: true});
    const dataSource = new FirestoreDistributorDataSource();
    const result = await dataSource.list('');
    result.do({
      right: (pagination) => {
        const distributorSelections = pagination.item.map(
          (x): KeyValuePair => {
            return {id: x.id, value: x.name};
          },
        );
        setState({distributorSelections});
      },
    });
    setState({isLoadingDistributor: false});
  },
  loadConsignment: (id: string) => async ({
    setState,
  }: ConsignmentEditingStoreApi) => {
    setState({isLoadingConsignment: true});
    const dataSource = new FirestoreConsignmentDataSource();
    const result = await dataSource.get(id);
    result.do({
      right: (consignment) => {
        setState({
          consignment,
          editingData: {
            createdDate: consignment.createdDate,
            distributorId: consignment.distributorId,
            name: consignment.name,
            shipper: consignment.shipper,
          },
        });
      },
    });
    setState({isLoadingConsignment: false});
  },
  setEditingData: (data: ConsignmentEditingData) => ({
    setState,
    getState,
  }: ConsignmentEditingStoreApi) => {
    const {editingData} = getState();
    setState({editingData: Object.assign(editingData, data)});
  },
};
