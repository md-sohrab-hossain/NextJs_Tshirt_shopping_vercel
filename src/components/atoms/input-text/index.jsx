import { mapModifiers } from 'libs/component';
import React from 'react';

const InputText = ({ placeholder = '', onChange, type = 'text' }) => {
  const componentClassName = mapModifiers('a-input-text');
  const className = `${componentClassName}`.trim();

  return <input className={className} type={type} placeholder={placeholder} onChange={onChange} />;
};

export default InputText;
