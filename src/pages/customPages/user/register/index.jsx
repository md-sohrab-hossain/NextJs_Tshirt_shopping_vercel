import { usePostRegisterUser } from 'api/usePostRegisterUser';
import Heading from 'components/atoms/heading';
import Form from 'components/molecules/form';
import { ROUTES } from 'constants/routes';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState('');
  const [isRegisterComplete, setIsRegisterComplete] = useState(() => false);
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  const { mutate: registerUser } = usePostRegisterUser();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

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
      setIsRegisterComplete(true);

      const userData = {
        name,
        email,
        password,
        avatar,
      };

      if (!userData.name || !userData.email || !userData.password || !userData.avatar) {
        setIsRegisterComplete(false);
        return toast.error('Please provide all required information !!');
      }

      registerUser(userData, {
        onSuccess: () => {
          setIsRegisterComplete(false);
          toast.success('User register successfully!');
          router.push(`${ROUTES.LOGIN}`);
        },
        onError: () => {
          setIsRegisterComplete(false);
          toast.error('Something went wrong!!');
        },
      });
    },
    [user, avatar, avatarPreview]
  );

  return (
    <div className="p-register">
      <Form
        loading={isRegisterComplete}
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
