import React from 'react';

export default function InputSearch({
  value,
  handleChangeInput,
  handlePressInput,
  handleClickButton,
  style
}) {
  return (
    <div className="container_input" style={style}>
      <input
        value={value}
        onChange={handleChangeInput}
        onKeyDown={handlePressInput}
        placeholder="Введите город"
        className="input_search"
      />
      <button onClick={handleClickButton} className="button_search">
        Поиск
      </button>
    </div>
  );
}
