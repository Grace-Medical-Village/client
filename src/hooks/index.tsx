import { useContext } from 'react';
import { PatientContext } from '../context/patient';

function useId(): string {
  const { state } = useContext(PatientContext);
  return state.id;
}

export { useId };
