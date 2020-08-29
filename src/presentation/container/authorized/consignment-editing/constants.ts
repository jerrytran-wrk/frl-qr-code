import {ConsignmentEditingState} from './ConsignmentEditing.type';
export const INITIAL_STATE: ConsignmentEditingState = {
  isEditing: false,
  isLoadingDistributor: false,
  distributorSelections: [],
  editingError: undefined,
  isLoadingConsignment: false,
  editingData: {},
};
