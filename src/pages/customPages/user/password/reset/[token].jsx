import { useResetPassword } from 'api/useResetPassword';
import Heading from 'components/atoms/heading';
import Form from 'components/molecules/form';
import { ROUTES } from 'constants/routes';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const NewPasswordPage = () => {
  const [userPassword, setUserPassword] = useState({
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();
  const { password, confirmPassword } = userPassword;

  const [isLoading, setIsLoading] = useState(() => false);
  const { mutate: resetPassword } = useResetPassword();

  const handleInputChanges = useCallback(
    e => {
      setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
    },
    [userPassword]
  );

  const submitHandler = e => {
    e.preventDefault();
    setIsLoading(true);

    const passwords = {
      password,
      confirmPassword,
    };

    if (!passwords.password || !passwords.confirmPassword) {
      setIsLoading(false);
      return toast.error('Please provide all information!');
    }

    resetPassword(
      { data: [router.query.token, passwords] },
      {
        onSuccess: ({ data }) => {
          setIsLoading(false);
          toast.success(data.message);
          router.push(`${ROUTES.LOGIN}`);
        },
        onError: () => {
          setIsLoading(false);
          toast.error('Something went wrong!!');
        },
      }
    );
  };

  return (
    <div className="p-reset-password">
      <Form
        loading={isLoading}
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
