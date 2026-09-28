import { useSelector } from "react-redux";
import { selectCurrentToken } from "../services/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;
  let isViewer = false;

  let status = "User";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, role } = decoded.userInfo;

    isAdmin = role.includes("Admin");
    isViewer = role.includes("Viewer");

    if (isAdmin) {
      status = "Admin";
    } else if (isViewer) {
      status = "Viewer";
    }

    return { username, role, status, isAdmin, isViewer };
  }
  return { username: "", role: [], isAdmin, isViewer, status };
};

export default useAuth;
