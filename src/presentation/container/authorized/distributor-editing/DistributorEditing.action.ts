import {DistributorEditingStoreApi} from './DistributorEditing.type';
import {INITIAL_STATE} from './constants';
import {DistributorEditingData, FirestoreDistributorDataSource} from '@data';

export const DistributorEditingActions = {
  reset: () => ({setState}: DistributorEditingStoreApi) => {
    setState(INITIAL_STATE);
  },
  setEditingData: (data: DistributorEditingData) => ({
    setState,
    getState,
  }: DistributorEditingStoreApi) => {
    const {editingData} = getState();
    setState({editingData: Object.assign(editingData, data)});
  },
  loadDistributor: (id: string) => async ({
    setState,
  }: DistributorEditingStoreApi) => {
    setState({isLoadingDistributor: true});
    const dataSource = new FirestoreDistributorDataSource();
    const result = await dataSource.get(id);
    result.do({
      right: (distributor) => {
        setState({
          distributor,
          editingData: {
            name: distributor.name,
            address: distributor.address,
            phone: distributor.phone,
            image: distributor.image,
          },
        });
      },
    });
    setState({isLoadingDistributor: false});
  },
  edit: () => async ({
    setState,
    getState,
  }: DistributorEditingStoreApi): Promise<void> => {
    const {editingData, distributor} = getState();
    setState({isEditing: true});
    const dataSource = new FirestoreDistributorDataSource();
    const result = await dataSource.edit(distributor!.id, editingData);
    setState({isEditing: false});
    return result.caseOf({
      right: (r) => r,
      left: () => {
        setState({editingError: 'Chỉnh sửa nhà phân phối thất bại!'});
      },
    });
  },
};
