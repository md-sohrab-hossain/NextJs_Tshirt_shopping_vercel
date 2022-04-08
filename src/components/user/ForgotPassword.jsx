import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, forgotPassword } from '../../redux/actions/userAction';

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
    <div className="forgot__password">
      <form className="forgot__password__form" onSubmit={submitHandler}>
        <h1 className="forgot__password__form__header">Forgot Password</h1>
        <div className="forgot__password__form__email">
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

        <button type="submit" className={loading ? 'button__wait' : 'button__send'} disabled={loading ? true : false}>
          <span>Send Email</span>
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
