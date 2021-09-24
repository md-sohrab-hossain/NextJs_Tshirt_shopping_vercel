import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../redux/actions/userAction";

import style from "./new_password.module.scss";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      router.push("/customPages/user/login");
    }
  }, [dispatch, success, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const passwords = {
      password,
      confirmPassword,
    };

    dispatch(resetPassword(router.query.token, passwords));
  };

  return (
    <div className={style.new__password}>
      <form className={style.new__password__form} onSubmit={submitHandler}>
        <h1 className={style.new__password__form__header}>New Password</h1>

        <div className={style.new__password__form__pass}>
          <label htmlFor="password_field">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={style.new__password__form__confirmPass}>
          <label htmlFor="confirm_password_field">Confirm Password</label>
          <input
            type="password"
            id="confirm_password_field"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={loading ? style.button__wait : style.button__setPass}
          disabled={loading ? true : false}
        >
          <span>Set Password</span>
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
