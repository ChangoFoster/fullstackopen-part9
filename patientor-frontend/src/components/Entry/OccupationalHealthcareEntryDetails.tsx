import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';
import { Icon } from "semantic-ui-react";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails: React.FC<Props> = ({entry}) => {
  return(
    <div>
      <Icon name="book" /> <br />
      Employer: {entry.employerName} <br />
      {entry.sickLeave &&
        `Sick leave
        from ${entry.sickLeave.startDate}
        to ${entry.sickLeave.endDate}`
      }
    </div>
  );
}

export default OccupationalHealthcareEntryDetails;
