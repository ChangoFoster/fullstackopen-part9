import React from 'react';
import { EntryType } from '../../types';
import { useStateValue } from "../../state";
import { assertNever } from '../../utils'
import { Segment } from "semantic-ui-react";

import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';

const Entry: React.FC<{entry: EntryType}> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();

  const entryDetails = () => {
    switch(entry.type) {
      case 'Hospital':
        return <HospitalEntryDetails entry={entry} />
      case 'HealthCheck':
        return <HealthCheckEntryDetails entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryDetails entry={entry} />
      default:
        return assertNever(entry);
    }
  };

  const diagnosisDetails = (code: string) => {
    const details = diagnosis.find(diagnosis => code === diagnosis.code)
    if(details) {
      return details.name
    }
    return "No details"
  }

  return(
    <Segment>
      Description: {entry.description} <br />
      Specialist: {entry.specialist} <br />
      Date: {entry.date} <br />
      {entry.diagnosisCodes &&
        <div>
          <p>Diagnosis codes:</p>
          <ul>
            {entry.diagnosisCodes.map(code =>
              <li key={code}>
                {code}: {diagnosisDetails(code)}
              </li>
            )}
          </ul>
        </div>
      }
      {entryDetails()}
      <br />
    </Segment>
  );
};

export default Entry;
