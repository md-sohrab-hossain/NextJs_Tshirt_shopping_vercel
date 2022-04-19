import { ROUTES } from 'constants/routes';
import { mapModifiers } from 'libs/component';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const defaultImg =
  'https://res.cloudinary.com/sajal-cnq/image/upload/v1624538021/tshirt/products/ezafikjm5prqocue1fgl.png';

const ButtonCircle = () => {
  const componentClassName = mapModifiers('a-button-circle');
  const className = `${componentClassName}`.trim();

  return (
    <Link href={`${ROUTES.PRODUCT_DESIGN}`}>
      <a>
        <div className={className}>
          <span className="a-button-circle__element"></span>
          <span className="a-button-circle__element"></span>
          <span className="a-button-circle__element"></span>
          <span className="a-button-circle__element"></span>
          <div className="a-button-circle__img">
            <Image draggable="false" src={defaultImg} alt="image" layout="fill" />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ButtonCircle;
