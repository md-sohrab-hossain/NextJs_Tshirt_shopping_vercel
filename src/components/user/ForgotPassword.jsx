import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../redux/actions/userAction';

import style from './forgot_password.module.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, message, error]);

  const submitHandler = e => {
    e.preventDefault();

    const userData = {
      email,
    };

    dispatch(forgotPassword(userData));
  };

  return (
    <div className={style.forgot__password}>
      <form className={style.forgot__password__form} onSubmit={submitHandler}>
        <h1 className={style.forgot__password__form__header}>Forgot Password</h1>
        <div className={style.forgot__password__form__email}>
          <label htmlFor="email_field">Email</label>
          <input
            required
            type="email"
            id="email_field"
            className="form-control"
            placeholder="Please Enter Your Email.."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={loading ? style.button__wait : style.button__send}
          disabled={loading ? true : false}
        >
          <span>Send Email</span>
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
