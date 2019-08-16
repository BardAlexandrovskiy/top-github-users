import React from 'react';

export default function InputSearch({
  value,
  handleChangeInput,
  handlePressInput,
  handleClickButton
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
      <button onClick={handleClickButton} className="button_search">
        Поиск
      </button>
    </div>
  );
}
