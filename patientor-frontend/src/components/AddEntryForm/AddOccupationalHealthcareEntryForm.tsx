import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NewOccupationalHealthcareEntryType, Diagnosis } from '../../types'

import { TextField, DiagnosisSelection } from "../../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: NewOccupationalHealthcareEntryType) => void;
  diagnosis: Diagnosis[]
}

const AddOccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, diagnosis }) => {
  return(
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "OccupationalHealthcare",
        employerName: ""
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
        if (!values.employerName) {
          errors.employerName = requiredError;
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
                  component={TextField}
                  label="Employer Name"
                  name="employerName"
                  placeholder="Employer name"
                />
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
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

export default AddOccupationalHealthcareEntryForm;
