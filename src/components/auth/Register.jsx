import React, { useState, useEffect, useCallback } from 'react';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

//? ----- Redux ------
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userAction';
//? ----- Redux ------

import style from './register.module.scss';

const Register = () => {
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

  const { success, error, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (success) {
      toast.success('User register successfully!');
      router.push('/customPages/user/login');
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

  const submitHandler = useCallback(
    e => {
      e.preventDefault();

      const userData = {
        name,
        email,
        password,
        avatar,
      };

      dispatch(registerUser(userData));
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

  return (
    <div className={style.register}>
      <form className={style.register__form} onSubmit={submitHandler}>
        <h1 className={style.register__form__header}>Join Us</h1>

        <div className={style.register__form__name}>
          <label htmlFor="name_field">Full Name</label>
          <input
            required
            type="text"
            id="name_field"
            className="form-control"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>

        <div className={style.register__form__email}>
          <label htmlFor="email_field">Email</label>
          <input
            required
            type="email"
            id="email_field"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>

        <div className={style.register__form__password}>
          <label htmlFor="password_field">Password</label>
          <input
            required
            type="password"
            id="password_field"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <div className={style.register__form__avatar}>
          <label htmlFor="avatar_upload">Avatar</label>
          <div className={style.register__form__avatar__items}>
            <img src={avatarPreview} className={style.register__form__avatar__items__img} alt="image" />

            <div className="custom-file">
              <input
                required
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
          className={loading ? style.button__wait : style.button__register}
          disabled={loading ? true : false}
        >
          <span>register</span>
        </button>

        <Link href="/customPages/user/login">
          <a className={style.register__form__login}>Already have an account?</a>
        </Link>
      </form>
    </div>
  );
};

export default Register;
