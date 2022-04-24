import { useEditUserProfile } from 'api/useEditUserProfile';
import { useGetUserDetails } from 'api/useGetUserDetails';
import Heading from 'components/atoms/heading';
import Loading from 'components/atoms/loading';
import Form from 'components/molecules/form';
import { getSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const userProfilePage = () => {
  const [avatar, setAvatar] = useState('');
  const [isUpdated, setIsUpdated] = useState(() => false);
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;
  const { mutate: updateProfile } = useEditUserProfile();
  const { data: userDetails, isLoading, refetch } = useGetUserDetails();

  useEffect(() => {
    if (userDetails) {
      setUser({
        name: userDetails?.user.name,
        email: userDetails?.user.email,
        password: '',
      });
      setAvatarPreview(userDetails?.user.avatar.url);
    }
  }, [userDetails]);

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
      setIsUpdated(true);

      const userData = {
        name,
        email,
        password,
        avatar,
      };

      if (!userData.name || !userData.email || !userData.password) {
        return toast.error('Please provide all required information !!');
      }

      updateProfile(userData, {
        onSuccess: () => {
          refetch();
          setIsUpdated(false);
          toast.success('Profile Updated Successfully!');
        },
        onError: () => {
          setIsUpdated(false);
          toast.error('Something went wrong!');
        },
      });
    },
    [user, avatar, avatarPreview]
  );

  if (isLoading) return <Loading square />;

  return (
    <div className="p-profile">
      <Form
        loading={isUpdated}
        modifiers="update-profile"
        btnMessage="Update"
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
        <Heading>Update Profile</Heading>
      </Form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/customPages/user/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default userProfilePage;
