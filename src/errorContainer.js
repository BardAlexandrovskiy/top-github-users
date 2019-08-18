import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorContainer({ style, handleClickErrorButton }) {
  return (
    <div className="lock_container" style={style}>
      <div className="error_container">
        <p className="error_text">Ошибка</p>
        <button type="button" className="error_button" onClick={handleClickErrorButton}>
          Ок
        </button>
      </div>
    </div>
  );
}

ErrorContainer.propTypes = {
  style: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClickErrorButton: PropTypes.func.isRequired,
};
