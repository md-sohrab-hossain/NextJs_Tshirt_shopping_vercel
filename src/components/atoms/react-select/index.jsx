import Icon from 'components/atoms/icon';
import { mapModifiers } from 'libs/component';
import React from 'react';
import Select, { components } from 'react-select';

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? <Icon name="dropdown-indicator-up" /> : <Icon name="dropdown-indicator-down" />}
      </components.DropdownIndicator>
    )
  );
};

const ReactSelect = ({ options, onChange, placeholder }) => {
  const componentClassName = mapModifiers('a-react-select');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <Select
        className={className}
        classNamePrefix={'a-react-select'}
        placeholder={placeholder}
        options={options}
        getOptionValue={option => option.value}
        isClearable={false}
        closeMenuOnSelect={true}
        components={{ DropdownIndicator }}
        onChange={onChange}
        noOptionsMessage={() => 'No Choice'}
      />
    </div>
  );
};

export default ReactSelect;
