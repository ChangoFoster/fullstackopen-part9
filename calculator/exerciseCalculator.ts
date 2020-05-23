console.log("Calculating exercise");

interface ExerciseValues {
  target: number;
  log: Array<number>;
}


interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (log: Array<number>, target: number): ExerciseResult => {
  if(log.length < 1) throw new Error('Make sure you add a full log');
  if(target <= 0) throw new Error('Set a target greater than 0');

  const periodLength = log.length; //the number of days

  const trainingDays = log.filter(i => i > 0).length; //the number of training days

  const daysTargetMet = log.filter(i => i >= target).length;
  const success = trainingDays <= daysTargetMet ? true : false; //boolean value describing if the target was reached

  let rating; //a rating between the numbers 1-3 that tells how well the hours are met.
  let ratingDescription; //a text value explaining the rating

  if(success) {
    rating = 3;
    ratingDescription = "You hit all of your targets";
  } else if (trainingDays === 0) {
    rating = 1;
    ratingDescription = "You didn't meet your target on any day, try harder";

  } else {
    rating = 2;
    ratingDescription = "You hit your target on some days but not all, nearly there";
  }

  const sum = log.reduce((prev, curr) => prev + curr);
  const average = sum / periodLength; //the calculated average time

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [,, target, ...log] = args;
  if (!isNaN(Number(target)) && log.every(value => !isNaN(Number(value)))) {
    return {
      target: Number(target),
      log: log.map(value => Number(value))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  console.log(parseExerciseArguments(process.argv));
  const { target, log } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(log, target));
}
catch(error) {
  console.log(error.message);
}

export { calculateExercises };
