import React from 'react';
import PropTypes from 'prop-types';

export default function InputSearch({
  value,
  handleChangeInput,
  handlePressInput,
  handleClickButton,
}) {
  return (
    <div className="container_input">
      <input
        value={value}
        onChange={handleChangeInput}
        onKeyDown={handlePressInput}
        placeholder="Введите город(на английском)"
        className="input_search"
      />
      <button type="button" onClick={handleClickButton} className="button_search">
        Поиск
      </button>
    </div>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
  handlePressInput: PropTypes.func.isRequired,
  handleClickButton: PropTypes.func.isRequired,
};
