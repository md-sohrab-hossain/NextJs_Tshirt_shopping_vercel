import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, updateProfile } from '../../redux/actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../redux/types/userTypes';
import Loading from '../atoms/Loading';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  const { user: loadedUser, loading } = useSelector(state => state.loadedUser);

  const { error, isUpdated, loading: updateLoading } = useSelector(state => state.user);

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
      router.push('/');
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [isUpdated, error, loadedUser]);

  const submitHandler = useCallback(
    e => {
      e.preventDefault();

      const userData = {
        name,
        email,
        password,
        avatar,
      };

      dispatch(updateProfile(userData));
    },
    [user, avatar, avatarPreview]
  );

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

  if (loading) return <Loading />;

  return (
    <div className="profile">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="profile__form" onSubmit={submitHandler}>
            <h1 className="profile__form__header">Update Profile</h1>

            <div className="profile__form__name">
              <label htmlFor="name_field">Name</label>
              <input
                required
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name || ''}
                onChange={onChange}
              />
            </div>

            <div className="profile__form__email">
              <label htmlFor="email_field">Email</label>
              <input
                required
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email || ''}
                onChange={onChange}
              />
            </div>

            <div className="profile__form__password">
              <label htmlFor="password_field">Password</label>
              <input
                required
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password || ''}
                onChange={onChange}
              />
            </div>

            <div className="profile__form__avatar">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="profile__form__avatar__items">
                <img src={avatarPreview} className="profile__form__avatar__items__img" alt="image" />

                <div className="custom-file">
                  <input
                    required={avatarPreview ? false : true}
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={updateLoading ? 'button__wait' : 'button__profile'}
              disabled={updateLoading ? true : false}
            >
              <span>Update</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
