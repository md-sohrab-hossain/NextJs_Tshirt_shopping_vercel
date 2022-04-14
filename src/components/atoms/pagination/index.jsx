import Icon from 'components/atoms/icon';
import { mapModifiers } from 'libs/component';
import React, { useMemo } from 'react';

const MAX_LENGTH = 7;
const SEPARATOR = '...';

const Pagination = ({ length, currentIndex, onChange, className: additionalClassName = '' }) => {
  const pageIndexes = useMemo(() => {
    if (length <= MAX_LENGTH) {
      return Array.from({ length }, (_val, idx) => idx + 1);
    }
    const arr = Array(MAX_LENGTH);

    // first 2 elements
    arr[0] = 1;
    arr[1] = currentIndex - 3 <= 1 ? 2 : SEPARATOR;

    // last 2 elements
    arr[arr.length - 2] = currentIndex + 3 >= length ? length - 1 : SEPARATOR;
    arr[arr.length - 1] = length;

    // middle 5 elements
    for (let i = 2; i < MAX_LENGTH - 2; i++) {
      if (arr[i - 1] !== SEPARATOR) {
        arr[i] = arr[i - 1] + 1;
      } else {
        if (arr[arr.length - 2] !== SEPARATOR) {
          arr[i] = length - 4;
        } else {
          arr[i] = currentIndex - 2;
        }
      }
    }

    return arr;
  }, [currentIndex, length]);

  const separatorList = useMemo(() => {
    const arr = [];
    pageIndexes.forEach((item, index) => {
      if (index === 1) {
        arr.push(item === SEPARATOR ? 1 : 0);
      } else if (item === SEPARATOR) {
        arr.push(1);
      }
    });
    return arr;
  }, [pageIndexes]);

  const isMiddle = separatorList.filter(x => x === 1).length === 2;
  const isFront = separatorList.length === 2 && separatorList[0] === 0;
  const isBack = separatorList.length === 1 && separatorList[0] === 1;

  const componentClassName = mapModifiers('a-pagination', isMiddle && 'middle', isFront && 'front', isBack && 'back');
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return (
    <div className={className}>
      {length > 1 && (
        <button
          className={mapModifiers('a-pagination__action', 'prev', currentIndex === 1 && 'disabled')}
          onClick={() => onChange && onChange(currentIndex - 1)}
        >
          <Icon name="arrow-left-gray-active" />
          <Icon name="arrow-left-gray-inactive" />
        </button>
      )}

      <ul className="a-pagination__pages">
        {pageIndexes.map((val, idx) => (
          <li
            className={mapModifiers(
              'a-pagination__page-item',
              currentIndex === val && 'active',
              val === '...' && 'ellipsis',
              isFront && idx > 3 && idx < 5 && 'optional',
              isMiddle && idx === 2 && 'optional',
              isBack && idx > 1 && idx < 3 && 'optional'
            )}
            key={idx}
            onClick={() => onChange && onChange(val)}
          >
            <span className="a-pagination__page-index">{val}</span>
          </li>
        ))}
      </ul>
      {length > 1 && (
        <button
          className={mapModifiers('a-pagination__action', 'next', currentIndex === length && 'disabled')}
          onClick={() => onChange && onChange(currentIndex + 1)}
        >
          <Icon name="arrow-right-gray-active" />
          <Icon name="arrow-right-gray-inactive" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
