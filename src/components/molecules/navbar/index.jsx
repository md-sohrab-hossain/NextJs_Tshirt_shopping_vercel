import Link from 'next/link';
import React, { useState } from 'react';
import { mapModifiers } from '../../../libs/component';
import ListItem from '../../atoms/list-item';
import UserInfo from '../../atoms/user-info';
// import Button from '../../atoms/button';
import CartIcon from '../../shopping/cart';
import MenuList from '../menu-list';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const componentClassName = mapModifiers('m-navbar');
  const className = `${componentClassName}`.trim();

  return (
    <nav className={className}>
      <div className="m-navbar__container">
        <div className="m-navbar__container--logo">
          <Link href="/">
            <label className="m-navbar__container--logo-text">T-shirt Shopping</label>
          </Link>
        </div>
        <div className="m-navbar__container--auth">
          {/* <Link href="/customPages/user/login">
            <Button size="small" modifiers="icon-text" icon="login">
              Login
            </Button>
          </Link> */}
          <UserInfo
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            name="md.soharub hossen"
            imgUrl="https://res.cloudinary.com/sajal-cnq/image/upload/v1624201629/tshirt/avatar/fks16fk1s8wbatrxvl6p.jpg"
          />
          <CartIcon />
        </div>
      </div>

      {isMenuOpen && (
        <MenuList>
          <ListItem>
            <Link href="/customPages/admin/users">
              <a>Users</a>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/customPages/admin/products">
              <a>Products</a>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/customPages/shopping">
              <a>My Orders</a>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/customPages/user/profile">
              <a>Profile</a>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/">
              <a>Logout</a>
            </Link>
          </ListItem>
        </MenuList>
      )}
    </nav>
  );
};

export default Navbar;
