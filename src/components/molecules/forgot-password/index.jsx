import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import InputText from 'components/atoms/input-text';
import { mapModifiers } from 'libs/component';
import React from 'react';

const ForgotPassword = ({ onSubmit, loading, email, setEmail }) => {
  const componentClassName = mapModifiers('m-forgot-password');
  const className = `${componentClassName}`.trim();

  return (
    <form className={className} onSubmit={onSubmit}>
      <Heading>Forgot Password</Heading>
      <div className="m-forgot-password__email">
        <label htmlFor="email">Email</label>
        <InputText
          required
          type="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="m-forgot-password__send">
        <Button modifiers={loading ? 'loading' : 'success'} disabled={loading ? true : false} type="submit">
          <span>Send Email</span>
        </Button>
      </div>
    </form>
  );
};

export default ForgotPassword;
