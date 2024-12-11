import React from 'react';
import './usersCard.css';
import Button from '../../smallButton';

interface UserCardProps {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  status: string;
  onDelete: () => void;
}

function UserCard({ firstname, lastname, email, role, status, onDelete }: UserCardProps) {
  return (
    <div className={`user-card ${status === 'INACTIVE' ? 'inactive' : ''}`}>
      <p className="user-details">{`Name: ${firstname} ${lastname}`}</p>
      <p className="user-details">{`Email: ${email}`}</p>
      <p className="user-details">{`Role: ${role}`}</p>
      <p className="user-details">{`Status: ${status}`}</p>
      {status === 'ACTIVE' && (
        <Button type="button" className="button-text" variant='delete' onClick={onDelete}>
          Delete User
        </Button>
      )}
    </div>
  );
}

export default UserCard;
