import { useGetUserDetails } from 'api/useGetUserDetails';
import Heading from 'components/atoms/heading';
import Loading from 'components/atoms/loading';
import Form from 'components/molecules/form';
import { getSession } from 'next-auth/client';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, updateProfile } from 'redux/actions/userAction';
import { UPDATE_PROFILE_RESET } from 'redux/types/userTypes';

const userProfilePage = () => {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  const { data: userDetails, isLoading, refetch } = useGetUserDetails();
  const { error, isUpdated } = useSelector(state => state.user);

  useEffect(() => {
    if (userDetails) {
      setUser({
        name: userDetails?.user.name,
        email: userDetails?.user.email,
        password: '',
      });
      setAvatarPreview(userDetails?.user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      refetch();
      dispatch({ type: UPDATE_PROFILE_RESET });
      toast.success('Profile Update Successfully!');
    }
  }, [error, isUpdated, userDetails]);

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

      if (!userData.name || !userData.email || !userData.password) {
        return toast.error('Please provide all required information !!');
      }

      dispatch(updateProfile(userData));
    },
    [user, avatar, avatarPreview]
  );

  if (isLoading) return <Loading square />;

  return (
    <div className="p-profile">
      <Form
        loading={isLoading}
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
