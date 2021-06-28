import Link from "next/link";
import React, { useEffect } from "react";
import style from "../../styles/layout_header.module.scss";

//?--- Redux --- //
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userAction";
//?--- Redux --- //

//? --- Next-auth ---//
import { signOut } from "next-auth/client";
//? --- Next-auth ---//

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.loadedUser);
  const { isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isUpdated) {
      dispatch(loadUser());
    }
  }, [dispatch, isUpdated]);

  return (
    <nav className={style.navbar}>
      <div className={style.navbar__container}>
        <div className={style.navbar__container__brand}>
          <Link href="/">
            <label onClick={() => (window.location.href = "/")}>
              T-shirt Shopping
            </label>
          </Link>
        </div>

        <div className={style.navbar__container__auth}>
          {user ? (
            <div className={style.navbar__dropdown}>
              <a
                className={style.navbar__dropdown__options}
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={user.avatar && user.avatar.url}
                  alt={user && user.name}
                  className="rounded-circle"
                />

                <span>{user && user.name}</span>
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user.role === "admin" && (
                  <>
                    <Link href="/customPages/admin/users">
                      <a className="dropdown-item">Users</a>
                    </Link>

                    <Link href="/customPages/admin/products">
                      <a className="dropdown-item">Products</a>
                    </Link>

                    <hr />
                  </>
                )}

                <Link href="/customPages/bookings/userInfo">
                  <a className="dropdown-item">My Orders</a>
                </Link>

                <Link href="/customPages/user/profile">
                  <a className="dropdown-item">Profile</a>
                </Link>

                <Link href="/">
                  <a
                    className="dropdown-item text-danger"
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: "/" })
                    }
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/customPages/user/login">
                <a className={style.login__header__button}>Login</a>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
