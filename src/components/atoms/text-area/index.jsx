import { mapModifiers } from 'libs/component';
import React from 'react';

const TextArea = ({ placeholder = '', name = '', value, onChange }) => {
  const componentClassName = mapModifiers('a-text-area');
  const className = `${componentClassName}`.trim();

  return (
    <textarea rows="2" className={className} name={name} value={value} placeholder={placeholder} onChange={onChange} />
  );
};

export default TextArea;
