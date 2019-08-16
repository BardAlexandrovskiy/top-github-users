import React from 'react';

export default function ItemList({ user }) {
  console.log(user);
  return (
    <li className="list_item">
      <div className="user_avatar_container">
        <img src={user.avatar_url} alt="avatar" className="user_avatar" />
      </div>
      <div className="list_item_content">
        <p className="login" onClick={() => window.open(user.html_url)}>
          {user.login}
        </p>
      </div>
    </li>
  );
}
