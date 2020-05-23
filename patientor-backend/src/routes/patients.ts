import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toEntryType } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  try{
    res.json(patientService.getPublicPatients());
  }
  catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', (req, res) => {
  try{
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientService.findById(id);

  try{
    if(patient) {
      res.send(patient);
    } else {
      res.status(404).send("Patient not found");
    }
  }
  catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  
  try{
    const newEntry = toEntryType(req.body);
    const patient = patientService.addEntry(id, newEntry);

    if(!patient) {
      res.status(404).send({error: "Patient not found"});
    }

    res.send(patient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


export default router;
