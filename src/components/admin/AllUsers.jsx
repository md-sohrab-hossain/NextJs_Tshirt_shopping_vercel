//? -- library -- */
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
//? -- library -- */

//? -- components -- */
import Loading from "../atoms/Loading";
import DeleteModal from "../atoms/DeleteModal";
//? -- components -- */

//? -- redux -- */
import {
  getAdminUsers,
  deleteUser,
  clearErrors,
} from "../../redux/actions/userAction";
import { DELETE_USER_RESET } from "../../redux/types/userTypes";
//? -- redux -- */

//? -- css -- */
import style from "./allUsers.module.scss";
//? -- css -- */

const AllUsers = () => {
  const [openModal, setOpenModal] = useState({
    id: null,
    open: false,
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Delete User Successfully!");
      router.push("/customPages/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted]);

  const deleteUserHandler = useCallback((id, Delete) => {
    if (Delete) {
      dispatch(deleteUser(id));
    }
    setOpenModal({ open: false, id: id });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className={style.AllUsers}>
        <div className={style.AllUsers__info}>
          <h2 className={style.AllUsers__info__count}>
            {`${users && users.length} users`}
          </h2>

          <table className={style.AllUsers__info__table}>
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users &&
                users.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img src={item.avatar.url} alt={item.name} />
                    </td>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString([], {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <>
                        <Link href={`/customPages/admin/users/${item._id}`}>
                          <a className="btn btn-primary">
                            <i className="fa fa-pencil"></i>
                          </a>
                        </Link>

                        <button
                          className="btn btn-danger mx-1"
                          onClick={() =>
                            setOpenModal({ id: item._id, open: true })
                          }
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteModal
        message="Do you want to delete?"
        handleOpen={openModal}
        handleDelete={deleteUserHandler}
      />
    </>
  );
};

export default AllUsers;
