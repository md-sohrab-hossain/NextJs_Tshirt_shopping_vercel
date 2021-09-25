import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../redux/actions/userAction";
import { UPDATE_USER_RESET } from "../../redux/types/userTypes";

import Loading from "../atoms/Loading";
import style from "./updateUser.module.scss";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, isUpdated } = useSelector((state) => state.user);
  const { user, loading } = useSelector((state) => state.userDetails);

  const userId = router.query.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      router.push("/customPages/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, userId, user, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    dispatch(updateUser(user._id, userData));
  };

  if (loading) return <Loading />;

  return (
    <div className={style.user}>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className={style.user__form} onSubmit={submitHandler}>
            <h1 className={style.user__form__header}>Update user</h1>

            <div className={style.user__form__name}>
              <label htmlFor="name_field">Name</label>
              <input
                required
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={style.user__form__email}>
              <label htmlFor="email_field">Email</label>
              <input
                required
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={style.user__form__role}>
              <label htmlFor="role_field">Role</label>
              <select
                id="role_field"
                className="form-control"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button type="submit" className={style.button__user}>
              <span>Update</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
