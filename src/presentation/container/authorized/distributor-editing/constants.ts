import {DistributorEditingState} from './DistributorEditing.type';
export const INITIAL_STATE: DistributorEditingState = {
  isEditing: false,
  isLoadingDistributor: false,
  editingError: undefined,
  editingData: {},
  distributor: undefined,
};
