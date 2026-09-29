import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { useGetUsersQuery } from "../../services/userApi";
import EditUserPage from "./EditUserPage";

const isProtected = (user) =>
  Array.isArray(user.role)
    ? user.role.includes("Admin")
    : user.role === "Admin";

const EditUser = () => {
  const { id } = useParams();
  const { data: users, isLoading, isError, error } = useGetUsersQuery();

  const user = users?.find((p) => p._id === id);

  if (!users) return <p>User not found!</p>;

  if (isLoading) return <ClipLoader />;

  if (isError) return <p>{error?.data || error.status || error.message}</p>;

  if (isProtected(user)) {
    return <p>The main admin account is protected and can't be edited here.</p>;
  }

  return <EditUserPage user={user} />;
};

export default EditUser;
