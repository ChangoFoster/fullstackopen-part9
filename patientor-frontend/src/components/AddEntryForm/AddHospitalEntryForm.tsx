import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NewHospitalEntry, Diagnosis } from '../../types'

import { TextField, DiagnosisSelection } from "../../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: NewHospitalEntry) => void;
  diagnosis: Diagnosis[]
}

const AddHosptialEntryForm: React.FC<Props> = ({ onSubmit, diagnosis }) => {
  return(
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        }
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
        if (!values.discharge.date || !values.discharge.criteria) {
          errors.discharge = requiredError;
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
                  label="Discharge date"
                  name="discharge.date"
                  placeholder="Discharge date"
                />
                <Field
                  component={TextField}
                  label="Discharge criteria"
                  name="discharge.criteria"
                  placeholder="Discharge criteria"
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

export default AddHosptialEntryForm;
