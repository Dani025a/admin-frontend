import React from "react";
import UsersList from "../../components/users/usersList/usersList";
import { useUsers } from "../../hooks/useUsers";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import "./users.css";
import { useAuth } from "../../hooks/useAuth";

function Users() {
  const { accessToken } = useAuth();
  const { users, loading, error, setUsers } = useUsers(accessToken!);
  const { deleteUser } = useDeleteUser();

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="users-page">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <UsersList users={users} onDeleteUser={handleDeleteUser} />
      )}
    </div>
  );
}

export default Users;
