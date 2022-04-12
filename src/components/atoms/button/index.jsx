import Icon from 'components/atoms/icon';
import { mapModifiers } from 'libs/component';
import React from 'react';

const Button = ({ type = 'button', size, modifiers, className: additionalClassName = '', children, icon, onClick }) => {
  const componentClassName = mapModifiers('a-button', modifiers, icon && 'icon', size && `size-${size}`);
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return (
    <button type={type} className={className} onClick={onClick}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
};

export default Button;
