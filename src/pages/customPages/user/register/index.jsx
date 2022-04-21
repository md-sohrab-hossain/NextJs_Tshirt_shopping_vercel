import Heading from 'components/atoms/heading';
import Form from 'components/molecules/form';
import { ROUTES } from 'constants/routes';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, registerUser } from 'redux/actions/userAction';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;
  const { success, error, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (success) {
      toast.success('User register successfully!');
      router.push(`${ROUTES.LOGIN}`);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

  const onChange = useCallback(
    e => {
      var pattern = /image-*/;
      const file = e.target?.files?.[0];
      if (e.target?.files?.[0] && !file.type.match(pattern)) return;

      if (e.target.name === 'avatar') {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatar(reader.result);
            setAvatarPreview(reader.result);
          }
        };

        e.target?.files?.[0] && reader.readAsDataURL(e.target.files[0]);
      } else {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
    },
    [user, avatar, avatarPreview]
  );

  const submitHandler = useCallback(
    e => {
      e.preventDefault();

      const userData = {
        name,
        email,
        password,
        avatar,
      };

      if (!userData.name || !userData.email || !userData.password || !userData.avatar) {
        toast.error('Please provide all required information !!');
        return;
      }

      dispatch(registerUser(userData));
    },
    [user, avatar, avatarPreview]
  );

  return (
    <div className="p-register">
      <Form
        loading={loading}
        btnMessage="Register"
        hasName
        name={name}
        isNameRequired
        hasEmail
        email={email}
        isEmailRequired
        hasPassword
        password={password}
        isPasswordRequired
        hasAvatar
        onSubmit={submitHandler}
        imgSrc={avatarPreview}
        setImgSrc={setAvatarPreview}
        onChange={onChange}
      >
        <Heading large>Join Us</Heading>
      </Form>
    </div>
  );
}

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
