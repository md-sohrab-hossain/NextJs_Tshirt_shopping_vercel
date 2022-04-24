import { useForgotPassword } from 'api/useForgotPassword';
import Heading from 'components/atoms/heading';
import Form from 'components/molecules/form';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(() => false);
  const { mutate: forgotPassword } = useForgotPassword();

  const onChange = useCallback(
    e => {
      setEmail(e.target.value);
    },
    [email]
  );

  const submitHandler = e => {
    e.preventDefault();
    setIsLoading(true);
    const userData = { email };

    if (!userData.email) {
      setIsLoading(false);
      return toast.error('Please provide an Email address!');
    }

    forgotPassword(userData, {
      onSuccess: ({ data }) => {
        setIsLoading(false);
        toast.success(data?.message);
      },
      onError: () => {
        setIsLoading(false);
        toast.error('Something went wrong!!');
      },
    });
  };

  return (
    <div className="p-forgot-password">
      <Form
        modifiers="forgot-password"
        loading={isLoading}
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
