import { mapModifiers } from 'libs/component';
import React from 'react';

const Loading = ({ className: additionalClassName = '', overlay, square }) => {
  const componentClassName = mapModifiers('a-loading', overlay && 'overlay', square && 'square');
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return (
    <div className={className}>
      <div className="a-loading__dot-grid">
        {[...Array(9)].map((x, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="a-loading__square"></div>
    </div>
  );
};

export default Loading;
