import React, { useState } from 'react';
import Link from 'next/link';

import { signIn } from 'next-auth/client';
import { toast } from 'react-toastify';

import style from './login.module.scss';

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
    <div className={style.login}>
      <form className={style.login__form} onSubmit={submitHandler}>
        <h1 className={style.login__form__header}>Login</h1>
        <div className={style.login__form__email}>
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

        <div className={style.login__form__password}>
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
          <a className={style.login__form__forgotPassword}>Forgot Password?</a>
        </Link>

        <button
          id="login_button"
          type="submit"
          className={loading ? style.button__wait : style.button__login}
          disabled={loading ? true : false}
        >
          <span>Login</span>
        </button>

        <Link href="/customPages/user/register">
          <a className={style.login__form__new__user}>New User?</a>
        </Link>
      </form>
    </div>
  );
};

export default Login;
