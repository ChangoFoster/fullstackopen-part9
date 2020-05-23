import React from 'react';
import { HealthCheckEntry } from '../../types';
import { Icon } from "semantic-ui-react";

import HealthRatingBar from '../../components/HealthRatingBar'

const HealthCheckEntryDetails: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
  return(
    <div>
      <Icon name="check circle" /> <br />
      Rating: <HealthRatingBar rating={entry.healthCheckRating} showText={true} /><br />
    </div>
  );
}

export default HealthCheckEntryDetails;
