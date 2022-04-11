import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { mapModifiers } from '../../../libs/component';
import Icon from '../icon';
import NotFoundImage from '/public/static/images/not-found.png';

const UserInfo = ({ name, imgUrl, onClick, isExpand = false }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const componentClassName = mapModifiers('a-user-info');
  const className = `${componentClassName}`.trim();

  const handleOnError = useCallback(() => {
    setImgSrc(NotFoundImage);
  }, []);

  return (
    <div className={className}>
      <div className="a-user-info__img">
        <Image draggable="false" onError={handleOnError} src={imgSrc} alt="user img" layout="fill" />
      </div>
      <div className="a-user-info__name">
        <span>{name}</span>
        <Icon name={isExpand ? 'expand-less' : 'expand-more'} onClick={() => onClick && onClick()} />
      </div>
    </div>
  );
};

export default UserInfo;
