import { signIn } from 'next-auth/client';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();

    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={submitHandler}>
        <h1 className="login__form__header">Login</h1>
        <div className="login__form__email">
          <label htmlFor="email_field">Email</label>
          <input
            required
            type="email"
            id="email_field"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="login__form__password">
          <label htmlFor="password_field">Password</label>
          <input
            required
            type="password"
            id="password_field"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <Link href="/customPages/user/password/forgot">
          <a className="login__form__forgotPassword">Forgot Password?</a>
        </Link>

        <button
          id="login_button"
          type="submit"
          className={loading ? 'button__wait' : 'button__login'}
          disabled={loading ? true : false}
        >
          <span>Login</span>
        </button>

        <Link href="/customPages/user/register">
          <a className="login__form__new__user">New User?</a>
        </Link>
      </form>
    </div>
  );
};

export default Login;
