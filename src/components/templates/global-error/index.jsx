import ErrorMessage from 'components/atoms/error-message';
import Icon from 'components/atoms/icon';
import Section from 'components/molecules/section';
import { errorResParser } from 'libs/utils';
import React from 'react';

const GlobalError = ({ error, onReset }) => {
  const errorRes = errorResParser(error);

  return (
    <Section className="t-global-error__section" padding="none" size="large-mobile">
      <Icon name="close" onClick={onReset} />
      <ErrorMessage error={errorRes} />
    </Section>
  );
};

export default GlobalError;
