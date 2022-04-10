import React, { Fragment } from 'react';
import { mapModifiers } from '../../../libs/component';

const Rating = ({ ratings = 0 }) => {
  const componentClassName = mapModifiers('a-rating');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      {[5, 4, 3, 2, 1].map(item => (
        <Fragment key={item}>
          <input type="radio" name="rating" defaultChecked={item === ratings ? true : false} value={item} id={item} />
          <label htmlFor={item}>☆</label>
        </Fragment>
      ))}
    </div>
  );
};

export default Rating;
