import Heading from 'components/atoms/heading';
import Loading from 'components/atoms/loading/index';
import Form from 'components/molecules/form';
import { getSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;
  const [loading, setLoading] = useState(() => false);
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);

  useEffect(() => {
    const handleRouteChange = () => setIsRoutesChange(false);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      setLoading(false);
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
      setIsRoutesChange(true);
      window.location.href = '/';
    }
  };

  return (
    <div className="p-login">
      <Form
        modifiers="login"
        loading={loading}
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
