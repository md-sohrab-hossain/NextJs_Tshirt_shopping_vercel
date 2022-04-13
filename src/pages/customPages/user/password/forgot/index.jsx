import ForgotPassword from 'components/molecules/forgot-password';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, forgotPassword } from 'redux/actions/userAction';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    message && toast.success(message);
  }, [dispatch, message, error]);

  const submitHandler = e => {
    e.preventDefault();
    const userData = {
      email,
    };

    dispatch(forgotPassword(userData));
  };

  return (
    <div className="p-forgot-password">
      <ForgotPassword onSubmit={submitHandler} loading={loading} email={email} setEmail={setEmail} />;
    </div>
  );
};

export default ForgotPasswordPage;
