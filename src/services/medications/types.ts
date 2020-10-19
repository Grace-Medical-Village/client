import { Item } from '../api/types';

export interface Medication extends Item {
  medicationName: string;
  dosage: string | number;
  dosageType: string;
  active: boolean;
  datePrescribed: string;
}
