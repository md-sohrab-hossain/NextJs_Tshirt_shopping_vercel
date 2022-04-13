import Button from 'components/atoms/button';
import ListItem from 'components/atoms/list-item';
import ShoppingCart from 'components/atoms/shopping-cart';
import UserInfo from 'components/atoms/user-info';
import MenuList from 'components/molecules/menu-list';
import ShoppingCartItemsList from 'components/molecules/shopping-cart-items-list';
import { ROUTES } from 'constants/routes';
import { mapModifiers } from 'libs/component';
import { useOnClickOutside } from 'libs/Hooks/useOnClickOutside';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

const Navbar = ({ products, user, loading, handleLogin, handleLogout, handleCheckout }) => {
  const router = useRouter();
  const menuListRef = useRef();
  const cartItemsListRef = useRef();
  const [isOpenCart, setIsOpenCart] = useState(() => false);
  const [isMenuOpen, setIsMenuOpen] = useState(() => false);
  const { HOME, ADMIN_USERS, ALL_PRODUCTS, MY_ORDERS, USER_PROFILE } = ROUTES;

  const componentClassName = mapModifiers('o-navbar');
  const className = `${componentClassName}`.trim();

  useOnClickOutside(menuListRef, () => setIsMenuOpen(false));
  useOnClickOutside(cartItemsListRef, () => setIsOpenCart(false));

  return (
    <nav className={className}>
      <div className="o-navbar__container">
        <div className="o-navbar__container--logo">
          <Link href={`${HOME}`}>
            <label
              className="o-navbar__container--logo-text"
              onClick={() => router.asPath.match(/page/g)?.length && (window.location.href = `${HOME}`)}
            >
              T-shirt Shopping
            </label>
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
              <Button size="small" modifiers="icon-text" icon="login" onClick={handleLogin}>
                Login
              </Button>
            )
          )}
          <ShoppingCart onClick={() => setIsOpenCart(!isOpenCart)} products={products} />
          {isOpenCart && <ShoppingCartItemsList onClick={handleCheckout} products={products} ref={cartItemsListRef} />}
        </div>
      </div>

      {isMenuOpen && (
        <MenuList ref={menuListRef}>
          {user.role === 'admin' && (
            <>
              <ListItem>
                <Link href={`${ADMIN_USERS}`}>
                  <a onClick={() => setIsMenuOpen(!isMenuOpen)}>Users</a>
                </Link>
              </ListItem>

              <ListItem>
                <Link href={`${ALL_PRODUCTS}`}>
                  <a onClick={() => setIsMenuOpen(!isMenuOpen)}>Products</a>
                </Link>
              </ListItem>
            </>
          )}
          <ListItem>
            <Link href={`${MY_ORDERS}`}>
              <a onClick={() => setIsMenuOpen(!isMenuOpen)}>My Orders</a>
            </Link>
          </ListItem>

          <ListItem>
            <Link href={`${USER_PROFILE}`}>
              <a onClick={() => setIsMenuOpen(!isMenuOpen)}>Profile</a>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/">
              <a onClick={handleLogout} className="o-navbar__logout">
                Logout
              </a>
            </Link>
          </ListItem>
        </MenuList>
      )}
    </nav>
  );
};

export default Navbar;
