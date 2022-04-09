import React from 'react';
import { mapModifiers } from '../../../libs/component';

const Heading = ({ className: additionalClassName = '', children, tag = 'h1', useDiv, align, large }) => {
  const componentClassName = mapModifiers('a-heading', `tag-${tag}`, large && 'large', align);
  const className = `${componentClassName} ${additionalClassName}`.trim();

  const renderHeadingText = () => {
    switch (tag) {
      case 'h1':
        return <h1 className="a-heading__text">{children}</h1>;
      case 'h2':
        return <h2 className="a-heading__text">{children}</h2>;
      case 'h3':
        return <h3 className="a-heading__text">{children}</h3>;
      case 'h4':
        return <h4 className="a-heading__text">{children}</h4>;
      case 'h5':
        return <h5 className="a-heading__text">{children}</h5>;
      case 'h6':
        return <h6 className="a-heading__text">{children}</h6>;
      default:
        return null;
    }
  };

  return (
    <div className={className}>{useDiv ? <div className="a-heading__text">{children}</div> : renderHeadingText()}</div>
  );
};

export default Heading;
