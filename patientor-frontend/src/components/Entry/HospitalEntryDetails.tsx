import React from 'react';
import { HospitalEntry } from '../../types';
import { Icon } from "semantic-ui-react";

const HospitalEntryDetails: React.FC<{entry: HospitalEntry}> = ({entry}) => {
  return(
    <div>
      <Icon name="hospital symbol" /> <br />
      Discharge date: {entry.discharge.date} <br />
      Criteria: {entry.discharge.criteria} <br />
    </div>
  );
}

export default HospitalEntryDetails;
