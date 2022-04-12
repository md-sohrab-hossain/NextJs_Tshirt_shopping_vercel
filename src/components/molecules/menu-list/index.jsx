import { mapModifiers } from 'libs/component';
import React, { forwardRef } from 'react';

const MenuList = forwardRef(({ children }, ref) => {
  const componentClassName = mapModifiers('m-menu-list');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
});

export default MenuList;
MenuList.displayName = 'menu-list';
