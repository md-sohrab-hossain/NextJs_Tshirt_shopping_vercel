import { mapModifiers } from 'libs/component';
import React from 'react';

const RegisterForm = props => {
  const componentClassName = mapModifiers('m-register-form');
  const className = `${componentClassName}`.trim();

  return <div className={className}>{props.children}</div>;
};

export default RegisterForm;
