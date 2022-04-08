import React, { memo } from 'react';

function DeleteModal({ message, handleOpen, handleDelete }) {
  return handleOpen?.open ? (
    <div className="deleteModal">
      <div className="deleteModal__body">
        <p>{message}</p>
        <div className="deleteModal__button">
          <button className="deleteModal__button__cancle" onClick={() => handleDelete(handleOpen?.id, false)}>
            Cancel
          </button>
          <button className="deleteModal__button__ok" onClick={() => handleDelete(handleOpen?.id, true)}>
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default memo(DeleteModal);
