import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Icon, Segment } from "semantic-ui-react";

import Entry from '../components/Entry';
import AddEntryForm from '../components/AddEntryForm';

import { Patient, Gender, NewEntryType } from '../types';
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { assertNever } from '../utils'

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if(patient && !patient.ssn){
      const fetchPatient = async () => {
        try{
          const { data: newPatientFromApi } = await axios
            .get<Patient>(`${apiBaseUrl}/patients/${patient.id}`);
          dispatch(updatePatient(newPatientFromApi));
        } catch(error) {
          console.error(error);
        }
      };
      fetchPatient();
    }
  }, [patient, dispatch]);

  if(!patient) {
    return <div>Loading...</div>;
  }

  const {gender, dateOfBirth, occupation, entries, name, ssn} = patient;

  const iconType = (gender: Gender) => {
    switch(gender) {
      case Gender.Male:
        return 'mars';
      case Gender.Female:
        return 'venus';
      case Gender.Other:
        return 'genderless';
      default:
        return assertNever(gender);
    }
  };

  const submitNewEntry = async (values: NewEntryType) => {
    console.log(values);
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="App">
      <div>
        <h2>
          {name} <Icon name={iconType(gender)} />
        </h2>
      </div>
      <div>
        Date of birth: {dateOfBirth} <br />
        SSN: {ssn} <br />
        Occupation: {occupation} <br />
      </div>
      <div>
        <h3>
          Add a new entry
        </h3>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={submitNewEntry} />
      </div>
      {<div>
        <h3>
          Current entries
        </h3>
        {entries && entries.map(entry => <Entry key={entry.id} entry={entry}/>)}
        {entries && entries.length < 1 && <div>No entries yet</div>}
      </div>}
    </div>
  );
};

export default PatientDetailPage;
