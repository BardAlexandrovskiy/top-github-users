import React from 'react';

export default function ErrorContainer({ style, handleClickErrorButton }) {
  return (
    <div style={style} className="error_container">
      <p className="error_text">Ошибка</p>
      <button className="error_button" onClick={handleClickErrorButton}>
        Ок
      </button>
    </div>
  );
}
