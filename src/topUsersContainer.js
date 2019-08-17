import React from 'react';
import ItemList from './itemList';

export default function TopUsersContainer({ users }) {
  return (
    <ul className="top_users_container">
      {users.map((user, index) => {
        return <ItemList key={index} user={user} />;
      })}
    </ul>
  );
}
