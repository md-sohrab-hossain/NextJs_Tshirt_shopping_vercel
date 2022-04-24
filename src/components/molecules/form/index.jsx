import Button from 'components/atoms/button';
import InputFile from 'components/atoms/input-file';
import InputText from 'components/atoms/input-text';
import Dropdown from 'components/atoms/react-select';
import TextArea from 'components/atoms/text-area';
import { ROUTES } from 'constants/routes';
import { mapModifiers } from 'libs/component';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback } from 'react';

const avatarDefault = '/images/default_avatar.jpg';

const Form = ({
  loading,
  imgSrc,
  setImgSrc,
  children,
  btnMessage,
  name,
  hasName = false,
  isNameRequired = false,
  email,
  hasEmail = false,
  isEmailRequired = false,
  modifiers = 'login' | 'register' | 'forgot-password' | 'update-user' | 'update-profile' | 'create-new-product',
  password,
  hasPassword = false,
  confirmPassword,
  hasResetPassword = false,
  isForgotPassword = false,
  isPasswordRequired = false,
  price,
  hasPrice = false,
  description,
  hasDescription = false,
  hasAvatar = false,
  imagesPreview,
  hasOldImagesPreview,
  hasMultipleImages = false,
  isNewUser = false,
  hasDropdown = false,
  dropdownOptions,
  handleDropdownOption,
  selectedDropdownValue,
  onChange,
  onSubmit,
}) => {
  const componentClassName = mapModifiers('m-form', modifiers);
  const className = `${componentClassName}`.trim();

  const handleOnError = useCallback(() => {
    setImgSrc(avatarDefault);
  }, []);

  return (
    <form className={className} onSubmit={onSubmit}>
      {children}

      {hasName && (
        <div className="m-form__name">
          <label htmlFor="name">
            {isNameRequired && <span className="m-form__name--required">*</span>}
            <span>Name</span>
          </label>
          <InputText type="text" id="name" placeholder="Enter Name" name="name" value={name} onChange={onChange} />
        </div>
      )}

      {hasEmail && (
        <div className="m-form__email">
          <label htmlFor="email">
            {isEmailRequired && <span className="m-form__email--required">*</span>}
            <span>Email</span>
          </label>
          <InputText type="email" name="email" placeholder="Enter Email" value={email} onChange={onChange} />
        </div>
      )}

      {hasPassword && (
        <>
          <div className="m-form__password">
            <label htmlFor="password">
              {isPasswordRequired && <span className="m-form__password--required">*</span>}
              <span>Password</span>
            </label>

            <InputText
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={onChange}
            />
          </div>

          {isForgotPassword && (
            <Link href={`${ROUTES.FORGOT_PASSWORD}`}>
              <a className="m-form__forgot-password">Forgot Password?</a>
            </Link>
          )}
        </>
      )}

      {hasResetPassword && (
        <>
          <div className="m-form__reset-password">
            <label htmlFor="confirmPassword">
              <span>Confirm Password</span>
            </label>

            <InputText
              type="password"
              name="confirmPassword"
              placeholder="Enter Password Again"
              value={confirmPassword}
              onChange={onChange}
            />
          </div>
        </>
      )}

      {hasPrice && (
        <div className="m-form__price">
          <label htmlFor="price">
            <span>Price</span>
          </label>
          <InputText type="number" name="price" placeholder="Enter Price" value={price} onChange={onChange} />
        </div>
      )}

      {hasDescription && (
        <div className="m-form__description">
          <label htmlFor="description">
            <span>Description</span>
          </label>
          <TextArea name="description" placeholder="Enter Description" value={description} onChange={onChange} />
        </div>
      )}

      {hasAvatar && (
        <div className="m-form__avatar">
          <span className="m-form__avatar--required">*</span>
          <label htmlFor="avatar_upload">Avatar</label>
          <div className="m-form__avatar--details">
            <div className="m-form__avatar--details-img">
              <Image draggable="false" onError={handleOnError} src={imgSrc} alt="avata img" layout="fill" />
            </div>

            <InputFile dataText="Choose Avatar" name="avatar" accept="image/*" onChange={onChange} />
          </div>
        </div>
      )}

      {hasMultipleImages && (
        <div className="m-form__multi-images">
          <label htmlFor="images">Images</label>
          <div className="m-form__multi-images--details">
            <InputFile multiple dataText="Choose Images" name="images" accept="image/*" onChange={onChange} />
          </div>

          <div className="m-form__multi-images--preview">
            {imagesPreview?.map((img, indx) => (
              <Image
                key={indx}
                draggable="false"
                onError={handleOnError}
                src={img}
                alt="image"
                height="50"
                width="50"
              />
            ))}

            {!imagesPreview.length &&
              hasOldImagesPreview?.map(img => (
                <Image
                  key={img.public_id}
                  draggable="false"
                  onError={handleOnError}
                  src={img.url}
                  alt="image"
                  height="50"
                  width="50"
                />
              ))}
          </div>
        </div>
      )}

      {hasDropdown && (
        <div className="m-form__dropdown">
          <label>
            <span>Role</span>
          </label>

          <Dropdown
            options={dropdownOptions}
            defaultValue={{ label: selectedDropdownValue, value: selectedDropdownValue }}
            onChange={option => handleDropdownOption && handleDropdownOption(option.value)}
          />
        </div>
      )}

      <div className="m-form__button-submit">
        <Button modifiers={loading ? 'loading' : 'success'} disabled={loading ? true : false} type="submit">
          <span>{btnMessage}</span>
        </Button>
      </div>

      {isNewUser && (
        <Link href={`${ROUTES.REGISTER_NEW_USERS}`}>
          <a className="m-form__new-user">New User?</a>
        </Link>
      )}

      {btnMessage === 'Register' && (
        <Link href={`${ROUTES.LOGIN}`}>
          <a className="m-form__login">Already have an account?</a>
        </Link>
      )}
    </form>
  );
};

export default Form;
