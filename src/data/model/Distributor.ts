export interface Distributor {
  id: string;
  name: string;
  address: string;
  phone: string;
  image?: string;
  createdAt: string;
  deleted: boolean;
}
export type DistributorAddingData = {
  name: string;
  address: string;
  phone: string;
  image?: string;
};

export type DistributorEditingData = {
  name?: string;
  address?: string;
  phone?: string;
  image?: string;
};
