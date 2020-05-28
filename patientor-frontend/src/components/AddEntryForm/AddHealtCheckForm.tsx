import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NewHealthCheckEntry, Diagnosis } from '../../types'

import {
  TextField,
  NumberField,
  DiagnosisSelection
} from "../../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: NewHealthCheckEntry) => void;
  diagnosis: Diagnosis[]
}

const AddHealthCheckForm: React.FC<Props> = ({ onSubmit, diagnosis }) => {
  return(
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0,
        diagnosisCodes: [],
        type: "HealthCheck"
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.healthCheckRating === undefined) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}>

      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return(
          <Form className="form ui">
            <Grid>
              <Grid.Column width={6}>
                <Field
                  component={TextField}
                  label="Description"
                  name="description"
                  placeholder="Description"
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  component={TextField}
                  label="Specialist"
                  name="specialist"
                  placeholder="Specialist"
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnosis)}
                />
                <Field
                  label="HealthCheck Rating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
                <Button
                  type="submit"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Submit
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AddHealthCheckForm;
