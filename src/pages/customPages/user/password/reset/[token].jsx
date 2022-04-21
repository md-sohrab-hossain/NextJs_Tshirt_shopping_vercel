import Heading from 'components/atoms/heading';
import Form from 'components/molecules/form';
import { ROUTES } from 'constants/routes';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, resetPassword } from 'redux/actions/userAction';

const NewPasswordPage = () => {
  const [userPassword, setUserPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { password, confirmPassword } = userPassword;
  const { error, loading, success } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      router.push(`${ROUTES.LOGIN}`);
    }
  }, [dispatch, success, error]);

  const handleInputChanges = useCallback(
    e => {
      setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
    },
    [userPassword]
  );

  const submitHandler = e => {
    e.preventDefault();

    const passwords = {
      password,
      confirmPassword,
    };

    if (!passwords.password || !passwords.confirmPassword) return toast.error('Please provide all information!');
    dispatch(resetPassword(router.query.token, passwords));
  };

  return (
    <div className="p-reset-password">
      <Form
        loading={loading}
        hasPassword
        hasResetPassword
        btnMessage="Set Password"
        onChange={handleInputChanges}
        onSubmit={submitHandler}
      >
        <Heading>New Password</Heading>
      </Form>
    </div>
  );
};

export default NewPasswordPage;
