import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapModifiers } from '../../../libs/component';
import { useOnClickOutside } from '../../../libs/Hooks/useOnClickOutside';
import { getMyOrders } from '../../../redux/actions/productOrderAction';
import { loadUser } from '../../../redux/actions/userAction';
import Button from '../../atoms/button';
import ListItem from '../../atoms/list-item';
import ShoppingCart from '../../atoms/shopping-cart';
import UserInfo from '../../atoms/user-info';
import MenuList from '../../molecules/menu-list';
import ShoppingCartItemsList from '../../molecules/shopping-cart-items-list';

const Navbar = () => {
  const router = useRouter();
  const menuListRef = useRef();
  const cartItemsListRef = useRef();
  const dispatch = useDispatch();
  const [isOpenCart, setIsOpenCart] = useState(() => false);
  const [isMenuOpen, setIsMenuOpen] = useState(() => false);
  const componentClassName = mapModifiers('o-navbar');
  const className = `${componentClassName}`.trim();

  useOnClickOutside(menuListRef, () => setIsMenuOpen(false));
  useOnClickOutside(cartItemsListRef, () => setIsOpenCart(false));

  const { user, loading } = useSelector(state => state.loadedUser);
  const { isUpdated } = useSelector(state => state.user);

  const { order } = useSelector(state => state.getMyOrderList);
  const { success } = useSelector(state => state.productOrder);

  useEffect(() => {
    if (!isUpdated) {
      dispatch(loadUser());
    }
  }, [dispatch, isUpdated]);

  const getRecentOrder = useCallback(() => {
    dispatch(getMyOrders());
  }, [success]);

  useEffect(async () => {
    getRecentOrder();
  }, [success]);

  return (
    <nav className={className}>
      <div className="o-navbar__container">
        <div className="o-navbar__container--logo">
          <Link href="/">
            <label className="o-navbar__container--logo-text">T-shirt Shopping</label>
          </Link>
        </div>
        <div className="o-navbar__container--auth">
          {user ? (
            <UserInfo
              isExpand={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              name={user?.name}
              imgUrl={user?.avatar?.url}
            />
          ) : (
            !loading && (
              <Button
                size="small"
                modifiers="icon-text"
                icon="login"
                onClick={() => router.push('/customPages/user/login')}
              >
                Login
              </Button>
            )
          )}
          <ShoppingCart onClick={() => setIsOpenCart(!isOpenCart)} products={order} />
          {isOpenCart && <ShoppingCartItemsList products={order} ref={cartItemsListRef} />}
        </div>
      </div>

      {isMenuOpen && (
        <MenuList ref={menuListRef}>
          {user.role === 'admin' && (
            <>
              <ListItem>
                <Link href="/customPages/admin/users">
                  <a onClick={() => setIsMenuOpen(!isMenuOpen)}>Users</a>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="/customPages/admin/products">
                  <a onClick={() => setIsMenuOpen(!isMenuOpen)}>Products</a>
                </Link>
              </ListItem>
            </>
          )}
          <ListItem>
            <Link href="/customPages/shopping">
              <a onClick={() => setIsMenuOpen(!isMenuOpen)}>My Orders</a>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/customPages/user/profile">
              <a onClick={() => setIsMenuOpen(!isMenuOpen)}>Profile</a>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/">
              <a onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>Logout</a>
            </Link>
          </ListItem>
        </MenuList>
      )}
    </nav>
  );
};

export default Navbar;
