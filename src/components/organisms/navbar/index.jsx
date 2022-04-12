import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { mapModifiers } from '../../../libs/component';
import { useOnClickOutside } from '../../../libs/Hooks/useOnClickOutside';
import Button from '../../atoms/button';
import ListItem from '../../atoms/list-item';
import ShoppingCart from '../../atoms/shopping-cart';
import UserInfo from '../../atoms/user-info';
import MenuList from '../../molecules/menu-list';
import ShoppingCartItemsList from '../../molecules/shopping-cart-items-list';

const Navbar = ({ products, user, loading }) => {
  const router = useRouter();
  const menuListRef = useRef();
  const cartItemsListRef = useRef();
  const [isOpenCart, setIsOpenCart] = useState(() => false);
  const [isMenuOpen, setIsMenuOpen] = useState(() => false);
  const componentClassName = mapModifiers('o-navbar');
  const className = `${componentClassName}`.trim();

  useOnClickOutside(menuListRef, () => setIsMenuOpen(false));
  useOnClickOutside(cartItemsListRef, () => setIsOpenCart(false));

  const handleCheckout = () => {
    if (!products?.orders.length) {
      return toast.warning('Your cart is empty!');
    }
    router.push('/customPages/shopping');
  };

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
          <ShoppingCart onClick={() => setIsOpenCart(!isOpenCart)} products={products} />
          {isOpenCart && <ShoppingCartItemsList onClick={handleCheckout} products={products} ref={cartItemsListRef} />}
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
