import Loading from 'components/atoms/loading/index';
import Login from 'components/molecules/login-form';
import { getSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);

  useEffect(() => {
    const handleRouteChange = () => setIsRoutesChange(false);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        onSubmit={submitHandler}
      />
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
