import React, { Fragment } from 'react';
import { mapModifiers } from '../../../libs/component';

const Rating = ({ ratings = 0, id = 123 }) => {
  const componentClassName = mapModifiers('a-rating');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      {[5, 4, 3, 2, 1].map(item => (
        <Fragment key={item}>
          <input
            type="radio"
            value={item}
            id={`${item}-#${id}`}
            name={`rating-#${id}`}
            defaultChecked={item === ratings ? true : false}
          />
          <label htmlFor={`${item}-#${id}`}>☆</label>
        </Fragment>
      ))}
    </div>
  );
};

export default Rating;
