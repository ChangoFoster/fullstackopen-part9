import patientsData from '../data/patients';
import { Patient, PublicPatient, NewPatient, EntryType } from '../types';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (patient: NewPatient): Patient => {
  const newId = new Date().getTime().toString();
  const newPatient = {
    id: newId,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addEntry = (id: string, entry: EntryType): Patient | undefined => {
   const updatedPatient = patients.find(patient => patient.id === id);
   if(updatedPatient) {
     updatedPatient.entries.push(entry);
     patients.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient);
     return updatedPatient;
   }
   return updatedPatient;
};

export default {
  getPatients,
  addPatient,
  getPublicPatients,
  findById,
  addEntry,
};
