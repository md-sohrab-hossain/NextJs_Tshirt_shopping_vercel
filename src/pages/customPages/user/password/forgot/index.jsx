import Heading from 'components/atoms/heading';
import Form from 'components/molecules/form';
import React, { useCallback, useEffect, useState } from 'react';
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

  const onChange = useCallback(
    e => {
      setEmail(e.target.value);
    },
    [email]
  );

  const submitHandler = e => {
    e.preventDefault();
    const userData = { email };

    if (!userData.email) {
      toast.error('Please provide an Email address!');
      return;
    }
    dispatch(forgotPassword(userData));
  };

  return (
    <div className="p-forgot-password">
      <Form
        modifiers="forgot-password"
        loading={loading}
        hasEmail
        email={email}
        btnMessage="Send Email"
        onChange={onChange}
        onSubmit={submitHandler}
      >
        <Heading large>Forgot Password</Heading>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
