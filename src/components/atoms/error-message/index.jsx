import Text from 'components/atoms/text';
import { mapModifiers } from 'libs/component';
import React from 'react';

const ErrorMessage = ({ error }) => {
  const componentClassName = mapModifiers('a-error-message');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      {error?.Message && (
        <Text size="small" className="a-error-message__message">
          {error?.Message}
        </Text>
      )}
    </div>
  );
};

export default ErrorMessage;
