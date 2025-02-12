import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import InputText from 'components/atoms/input-text';
import { mapModifiers } from 'libs/component';
import React from 'react';

const ForgotPassword = ({ loading, email, onSubmit, onChange }) => {
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
          placeholder="Please Enter Your Email.."
          value={email}
          onChange={onChange}
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
