import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import InputFile from 'components/atoms/input-file';
import InputText from 'components/atoms/input-text';
import { ROUTES } from 'constants/routes';
import { mapModifiers } from 'libs/component';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback } from 'react';

const avatarDefault = 'https://next-js-tshirt-shopping-7dltd6ofj-sajalkhan.vercel.app/images/default_avatar.jpg';

const RegisterForm = ({ loading, name, email, password, imgSrc, setImgSrc, onChange, onSubmit }) => {
  const { LOGIN } = ROUTES;

  const componentClassName = mapModifiers('m-register-form');
  const className = `${componentClassName}`.trim();

  const handleOnError = useCallback(() => {
    setImgSrc(avatarDefault);
  }, []);

  return (
    <form className={className} onSubmit={onSubmit}>
      <Heading large>Join Us</Heading>

      <div className="m-register-form__name">
        <label htmlFor="name">
          <span className="m-register-form__name--required">*</span>
          <span>Full Name</span>
        </label>
        <InputText type="text" id="name" placeholder="Enter Name" name="name" value={name} onChange={onChange} />
      </div>

      <div className="m-register-form__email">
        <label htmlFor="email">
          <span className="m-register-form__email--required">*</span>
          <span>Email</span>
        </label>
        <InputText type="email" name="email" placeholder="Enter Email" value={email} onChange={onChange} />
      </div>

      <div className="m-register-form__password">
        <label htmlFor="password">
          <span className="m-register-form__password--required">*</span>
          <span>Password</span>
        </label>
        <InputText type="password" name="password" placeholder="Enter Password" value={password} onChange={onChange} />
      </div>

      <div className="m-register-form__avatar">
        <label htmlFor="avatar_upload">Avatar</label>
        <div className="m-register-form__avatar--details">
          <div className="m-register-form__avatar--details-img">
            <Image draggable="false" onError={handleOnError} src={imgSrc} alt="avata img" layout="fill" />
          </div>

          <InputFile dataText="Choose Avatar" name="avatar" accept="images/*" onChange={onChange} />
        </div>
      </div>

      <div className="m-register-form__register">
        <Button modifiers={loading ? 'loading' : 'success'} disabled={loading ? true : false} type="submit">
          <span>Register</span>
        </Button>
      </div>

      <Link href={`${LOGIN}`}>
        <a className="m-register-form__login">Already have an account?</a>
      </Link>
    </form>
  );
};

export default RegisterForm;
