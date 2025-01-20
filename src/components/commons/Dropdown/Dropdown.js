import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import s from './Dropdown.module.scss';
import clsx from 'clsx';

const Dropdown = ({ options, placeholder = 'Выберите значение', onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const handleSelect = option => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const handleClickOutside = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={s.dropdown} ref={dropdownRef}>
      <button
        type="button"
        className={s.dropdownToggle}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selected ? selected.label : placeholder}
        <span className={clsx(s.arrow, { [s.open]: isOpen })}>▼</span>
      </button>
      {isOpen && (
        <ul className={s.dropdownMenu}>
          {options.map(option => (
            <li
              key={option.value}
              className={s.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
