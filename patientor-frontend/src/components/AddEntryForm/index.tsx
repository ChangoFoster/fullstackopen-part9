import React from 'react';
import { useStateValue } from '../../state';
import { NewEntryType } from '../../types';
import {  assertNever } from '../../utils';
import { Segment } from "semantic-ui-react";

import AddHealthCheckForm from './AddHealtCheckForm'
import AddHosptialEntryForm from './AddHospitalEntryForm'
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm'

interface Props {
  onSubmit: (values: NewEntryType) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [{ diagnosis }] = useStateValue();
  const [type, setType] = React.useState<NewEntryType['type']>("HealthCheck")

  const selectForm = () => {
    switch(type) {
      case "HealthCheck":
        return <AddHealthCheckForm
          onSubmit={onSubmit}
          diagnosis={diagnosis}
        />
      case "Hospital":
        return <AddHosptialEntryForm
          onSubmit={onSubmit}
          diagnosis={diagnosis}
        />
      case "OccupationalHealthcare":
        return <AddOccupationalHealthcareEntryForm
          onSubmit={onSubmit}
          diagnosis={diagnosis}
        />
      default:
        return assertNever(type);
    }
  }

  return(
    <div>
      <select
        value={type}
        onChange={({ target }) => setType(target.value as NewEntryType['type'])}
      >
        <option value="HealthCheck">HealthCheck</option>
        <option value="Hospital">Hospital</option>
        <option value="OccupationalHealthcare">Occupational Healthcare</option>
      </select>
      <Segment>
        {selectForm()}
      </Segment>
    </div>
  );
}

export default AddEntryForm;
