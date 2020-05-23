import {
  NewPatient,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  EntryType,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry
} from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseName = (name: any): string => {
  if(!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseOccupation = (occupation: any): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const parseSsn = (ssn: any): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: []
  };
  return newPatient;
};

const parseCriteria = (criteria: any): string => {
  if(!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing criteria: ${criteria}`);
  }
  return criteria;
};

const parseDescription = (description: any): string => {
  if(!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseDiagnosesCodes = (codes: any): string[] | undefined => {
  if(codes && (!Array.isArray(codes) || !codes.map(code => !isString(code)))) {
    throw new Error(`Incorrect or missing list of diagnosis codes ${codes}`);
  }
  return codes;
};

const parseEmployerName = (employerName: any): string => {
  if(!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employer name: ${employerName}`);
  }
  return employerName;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if(healthCheckRating === undefined
    || !Number.isInteger(Number(healthCheckRating))
    || !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(`Incorrect or missing health check rating ${healthCheckRating}`);
  }
  return Number(healthCheckRating);
};

const parseSpecialist = (specialist: any): string => {
  if(!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }
  return specialist;
};

const parseType = (type: any): "Hospital" | "OccupationalHealthcare" | "HealthCheck"  => {
  if(type === "Hospital" || type === "OccupationalHealthcare" || type === "HealthCheck") {
    return type;
  }
  throw new Error (`Incorrect or unsupported entry type: ${type}`);
};

export const toEntryType = (object: any): EntryType => {
  const newBaseEntry: NewBaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };

  if(object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  const id: string = new Date().getTime().toString();
  const type = parseType(object.type);

  switch(type) {
    case "Hospital":
      const newHosptialEntry: HospitalEntry = {
        ...newBaseEntry,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseCriteria(object.discharge.criteria)
        },
        id, type
      };
      return newHosptialEntry;
    case "HealthCheck":
      const newHealthCheckEntry: HealthCheckEntry = {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        id, type
      };
      return newHealthCheckEntry;
    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: OccupationalHealthcareEntry = {
        ...newBaseEntry,
        employerName: parseEmployerName(object.employerName),
        id, type
      };

      if(object.sickLeave) {
        newOccupationalHealthcareEntry.sickLeave = {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        };
      }

      return newOccupationalHealthcareEntry;
    default:
      return assertNever(type);
  }
};
