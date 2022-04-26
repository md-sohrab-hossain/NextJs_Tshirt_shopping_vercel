import { useGetOrderList } from 'api/useGetOrderList';
import { useGetUserDetails } from 'api/useGetUserDetails';
import Heading from 'components/atoms/heading';
import Loading from 'components/atoms/loading';
import Form from 'components/molecules/form';
import { ROUTES } from 'constants/routes';
import { useGetAbsoluteUrl } from 'libs/utils';
import { getSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const router = useRouter();
  const absoluteUrl = useGetAbsoluteUrl();
  const { refetch: refetchUserDetails } = useGetUserDetails();
  const { refetch: refetchOrderList } = useGetOrderList(absoluteUrl);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  const [isLoading, setIsLoading] = useState(() => false);
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);

  useEffect(() => {
    const handleRouteChange = () => setIsRoutesChange(false);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      setIsLoading(false);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const handleInputChanges = useCallback(
    e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    },
    [user]
  );

  const submitHandler = async e => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      refetchOrderList();
      refetchUserDetails();
      setIsRoutesChange(true);
      router.push(`${ROUTES.HOME}`);
    }
  };

  return (
    <div className="p-login">
      <Form
        modifiers="login"
        loading={isLoading}
        hasEmail
        email={email}
        hasPassword
        password={password}
        isForgotPassword
        isNewUser
        btnMessage="Login"
        onChange={handleInputChanges}
        onSubmit={submitHandler}
      >
        <Heading large>Login</Heading>
      </Form>
      {isRoutesChange && <Loading overlay />}
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default LoginPage;
