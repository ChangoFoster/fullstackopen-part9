import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import pingRouter from './routes/ping';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/ping', pingRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/diagnosis', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
