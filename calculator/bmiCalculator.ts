console.log("Calculating BMI");

interface BmiValues {
  height: number;
  weight: number;
}

type BmiResult = "Very severely underweight"
  | "Severely underweight"
  | "Underweight"
  | "Normal (healthy weight)"
  | "Overweight"
  | "Obese Class I (Moderately obese)"
  | "Obese Class II (Severely obese)"
  | "Obese Class III (Very severely obese)";

const calculateBmi = (height: number, weight: number): BmiResult => {
  if (height < 0) throw new Error('Add a height greater than 0');
  if (weight < 0) throw new Error('Add a weight greater than 0');

  const heightM: number = height / 100;
  const bmi: number = (weight / Math.pow(heightM, 2));

  switch(true) {
    case (0 <= bmi && bmi < 15):
      return "Very severely underweight";
    case (15 <= bmi && bmi < 16):
      return "Severely underweight";
    case (16 <= bmi && bmi < 18.5):
      return "Underweight";
    case (18.5 <= bmi && bmi < 25):
      return "Normal (healthy weight)";
    case (25 <= bmi && bmi < 30):
      return "Overweight";
    case (30 <= bmi && bmi < 35):
      return "Obese Class I (Moderately obese)";
    case (35 <= bmi && bmi < 40):
      return "Obese Class II (Severely obese)";
    case (40 <= bmi):
      return "Obese Class III (Very severely obese)";
    default:
      throw new Error('Not a number');
  }
};

const parseBmiCliArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if ( !isNaN(Number(args[2])) && !isNaN(Number(args[3])) ) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseBmiCliArguments(process.argv);
  console.log(calculateBmi(height, weight));
}
catch (error) {
  console.log(error.message);
}

export { calculateBmi };
