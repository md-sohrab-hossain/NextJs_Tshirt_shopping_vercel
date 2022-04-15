import { mapModifiers } from 'libs/component';
import React, { useEffect } from 'react';

const Dropdown = ({ options, onClick }) => {
  const componentClassName = mapModifiers('a-dropdown');
  const className = `${componentClassName}`.trim();

  useEffect(() => {
    const select = document.querySelector('.a-dropdown__select');
    const selected = document.querySelector('.a-dropdown__select--selected');
    const indicator = document.querySelector('.a-dropdown__select--indicator');
    const menu = document.querySelector('.a-dropdown__menu');
    const options = document.querySelectorAll('.a-dropdown__menu li');

    select.addEventListener('click', () => {
      select.classList.toggle('a-dropdown__select--clicked');
      indicator.classList.toggle('a-dropdown__select--indicator-rotate');
      menu.classList.toggle('a-dropdown__menu--open');
    });

    options?.forEach(option => {
      option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        select.classList.remove('a-dropdown__select--clicked');
        indicator.classList.remove('a-dropdown__select--indicator-rotate');
        menu.classList.remove('a-dropdown__menu--open');

        options?.forEach(item => {
          item.classList.remove('a-dropdown__menu--active');
        });

        option.classList.add('a-dropdown__menu--active');
      });
    });
  }, []);

  return (
    <div className={className}>
      <div className="a-dropdown__select">
        <span className="a-dropdown__select--selected">Select..</span>
        <div className="a-dropdown__select--indicator"></div>
      </div>
      <ul className="a-dropdown__menu" onClick={onClick}>
        {options.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
