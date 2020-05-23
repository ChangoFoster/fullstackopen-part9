import React, { FC } from 'react';
import { CoursePart } from '../types'

const Part: FC<{ part: CoursePart }> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch(part.name) {
    case "Fundamentals":
      return(
        <div>
          Name: {part.name} <br />
          Desc: {part.description} <br />
          Exercises: {part.exerciseCount} <br />
        </div>
      );
    case "Using props to pass data":
      return(
        <div>
          Name: {part.name} <br />
          Group exercises: {part.groupProjectCount} <br />
          Exercises: {part.exerciseCount} <br />
        </div>
      );
    case "Deeper type usage":
      return(
        <div>
          Name: {part.name} <br />
          Submission link: {part.exerciseSubmissionLink} <br />
          Exercises: {part.exerciseCount} <br />
        </div>
      );
    case "Zoo keeping":
      return(
        <div>
          Name: {part.name} <br />
          Exercises: {part.exerciseCount} <br />
          Description: {part.description} <br />
          Animals: {part.animals} <br />
        </div>
      );
    default:
      return assertNever(part);
  }
}

export default Part;
