import React from 'react';
import UserCard from '../usersCard/usersCard';
import './usersList.css';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  status: string;
}

interface UsersListProps {
  users: User[];
  onDeleteUser: (id: string) => void;
}

function UsersList({ users, onDeleteUser }: UsersListProps) {
  const sortedUsers = [...users].sort((a, b) =>
    a.status === 'ACTIVE' && b.status === 'INACTIVE' ? -1 : 1
  );

  return (
    <div className="users-list">
      <h2 className="title">Users</h2>
      {sortedUsers.map((user) => (
        <UserCard
          key={user.id}
          firstname={user.firstname}
          lastname={user.lastname}
          email={user.email}
          role={user.role}
          status={user.status}
          onDelete={() => onDeleteUser(user.id)}
        />
      ))}
    </div>
  );
}

export default UsersList;
