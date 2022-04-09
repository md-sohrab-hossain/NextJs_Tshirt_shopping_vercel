import React from 'react';
import { mapModifiers } from '../../../libs/component';

const InputText = ({ placeholder = '', onChange, type = 'text' }) => {
  const componentClassName = mapModifiers('a-input-text');
  const className = `${componentClassName}`.trim();

  return <input className={className} type={type} placeholder={placeholder} onChange={onChange} autoFocus />;
};

export default InputText;
