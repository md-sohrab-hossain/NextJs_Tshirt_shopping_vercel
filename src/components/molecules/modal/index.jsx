import Button from 'components/atoms/button';
import Text from 'components/atoms/text';
import { mapModifiers } from 'libs/component';
import React, { memo } from 'react';

const Modal = ({ message, removeProductId = null, onClick }) => {
  const componentClassName = mapModifiers('m-modal');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <div className="m-modal__body">
        <div className="m-modal__body--message">
          <Text>{message}</Text>
        </div>
        <div className="m-modal__body--button">
          <Button modifiers="success" size="small" onClick={() => onClick && onClick(true, removeProductId)}>
            ok
          </Button>
          <Button modifiers="red" size="small" onClick={() => onClick && onClick(false)}>
            Cancle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(Modal);
