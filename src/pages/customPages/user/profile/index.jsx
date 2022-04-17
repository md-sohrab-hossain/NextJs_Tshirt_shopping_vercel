import Loading from 'components/atoms/Loading';
import ProfileForm from 'components/molecules/register-form';
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

  const { user: loadedUser, loading } = useSelector(state => state.loadedUser);

  const { error, isUpdated, loading: isLoading } = useSelector(state => state.user);

  useEffect(() => {
    if (loadedUser) {
      setUser({
        name: loadedUser.name,
        email: loadedUser.email,
      });
      setAvatarPreview(loadedUser.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_PROFILE_RESET });
      toast.success('Profile Update Successfully!');
    }
  }, [isUpdated, error, loadedUser]);

  const onChange = useCallback(
    e => {
      if (e.target.name === 'avatar') {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatar(reader.result);
            setAvatarPreview(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
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
        toast.error('Please provide all required information !!');
        return;
      }

      dispatch(updateProfile(userData));
    },
    [user, avatar, avatarPreview]
  );

  if (loading) return <Loading />;

  return (
    <div className="p-profile">
      <ProfileForm
        loading={isLoading}
        headingMessage="Update Profile"
        submitBtnMessage="Update"
        name={name}
        email={email}
        password={password}
        onSubmit={submitHandler}
        imgSrc={avatarPreview}
        setImgSrc={setAvatarPreview}
        onChange={onChange}
      />
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
