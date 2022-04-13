import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import InputText from 'components/atoms/input-text';
import { ROUTES } from 'constants/routes';
import { mapModifiers } from 'libs/component';
import Link from 'next/link';
import React from 'react';

const LoginForm = ({ email, setEmail, password, setPassword, loading, onSubmit }) => {
  const { FORGOT_PASSWORD, REGISTER_NEW_USERS } = ROUTES;

  const componentClassName = mapModifiers('m-login-form');
  const className = `${componentClassName}`.trim();

  return (
    <form className={className} onSubmit={onSubmit}>
      <Heading large>Login</Heading>

      <div className="m-login-form__email">
        <label htmlFor="email">Email</label>
        <InputText
          type="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="m-login-form__password">
        <label htmlFor="password">Password</label>
        <InputText
          type="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <Link href={`${FORGOT_PASSWORD}`}>
        <a className="m-login-form__forgot-password">Forgot Password?</a>
      </Link>

      <div className="m-login-form__login">
        <Button modifiers={loading ? 'loading' : 'success'} disabled={loading ? true : false} type="submit">
          <span>Login</span>
        </Button>
      </div>

      <Link href={`${REGISTER_NEW_USERS}`}>
        <a className="m-login-form__new-user">New User?</a>
      </Link>
    </form>
  );
};

export default LoginForm;
