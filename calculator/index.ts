import express from 'express';
import { calculateBmi }  from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

//TODO: Up to 9.5

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);
  if(!height || !weight) {
    res.send({ error: "missing parameters" });
  }
  if(isNaN(height) || isNaN(weight)) {
    res.send({ error: "malformed parameters" });
  }
  if(!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  }
  res.send({ error: "unknown error" });
});

app.post('/exercises', (_req, res) => {
  console.log(_req.body);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { target, log}: any = _req.body;

  if(!log || !target) {
    res.send({ error: "missing parameters"});
  }

  if(!isNaN(Number(target))
    && Array.isArray(log)
    && log.every(exercise => !isNaN(Number(exercise)))
  ) {
    const parsedTarget = Number(target);
    const parsedLog = log.map(exercise => Number(exercise));

    try {
      res.json(calculateExercises(parsedLog, parsedTarget));
    }
    catch(error) {
      res.send({ error: error.message });
    }
  } else {
    res.send({ error: "malformed parameters" });
  }

  res.send({ error: "unknown error" });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
