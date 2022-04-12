import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { ROUTES } from '../../../constants/routes';
import { mapModifiers } from '../../../libs/component';
import { useOnClickOutside } from '../../../libs/Hooks/useOnClickOutside';
import Button from '../../atoms/button';
import ListItem from '../../atoms/list-item';
import ShoppingCart from '../../atoms/shopping-cart';
import UserInfo from '../../atoms/user-info';
import MenuList from '../../molecules/menu-list';
import ShoppingCartItemsList from '../../molecules/shopping-cart-items-list';

const Navbar = ({ products, user, loading, handleLogin, handleLogout, handleCheckout }) => {
  const menuListRef = useRef();
  const cartItemsListRef = useRef();
  const [isOpenCart, setIsOpenCart] = useState(() => false);
  const [isMenuOpen, setIsMenuOpen] = useState(() => false);
  const { ADMIN_USERS, ALL_PRODUCTS, MY_ORDERS, USER_PROFILE } = ROUTES;

  const componentClassName = mapModifiers('o-navbar');
  const className = `${componentClassName}`.trim();

  useOnClickOutside(menuListRef, () => setIsMenuOpen(false));
  useOnClickOutside(cartItemsListRef, () => setIsOpenCart(false));

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
