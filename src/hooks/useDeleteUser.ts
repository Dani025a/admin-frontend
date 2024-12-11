import { apiClient } from "../services/apiClient";

export const useDeleteUser = () => {
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/${userId}`);
    } catch (error: any) {
      console.error("Failed to delete user:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  return { deleteUser };
};
