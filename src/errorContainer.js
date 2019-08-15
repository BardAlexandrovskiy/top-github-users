import React from 'react';

export default function ErrorContainer({ style, handleClickErrorButton }) {
  return (
    <div className="lock_container" style={style}>
      <div className="error_container">
        <p className="error_text">Ошибка</p>
        <button className="error_button" onClick={handleClickErrorButton}>
          Ок
        </button>
      </div>
    </div>
  );
}
