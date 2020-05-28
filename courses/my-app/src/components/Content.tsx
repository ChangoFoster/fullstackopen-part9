import React, { FC } from 'react';
import Part from './Part'
import { CoursePart } from '../types'

const Content: FC<{courseParts: CoursePart[]}> = ({ courseParts }) => {
  return(
    <>
      {courseParts.map(part =>
        <Part key={part.name} part={part} />
      )}
    </>
  );
}

export default Content
