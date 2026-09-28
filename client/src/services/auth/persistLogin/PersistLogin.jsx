import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import styles from "./PersistLogin.module.css";
import { setCredentials } from "../authSlice";
import { useRefreshMutation } from "../authApi";

const PersistLogin = () => {
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const { accessToken } = await refresh().unwrap();

        dispatch(setCredentials({ accessToken }));
      } catch (err) {
        console.log("No valid token found");
        setSessionExpired(true);
      } finally {
        setLoading(false);
      }
    };

    refreshAccessToken();
  }, [refresh, dispatch]);

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <ClipLoader size={50} />
      </div>
    );
  }

  if (sessionExpired) {
    return <Navigate
      to="/login"
      state={{
        from: location,
        message: "Your session has expired. Please log in again",
      }}
      replace
    />;
  }

  return <Outlet />;
};

export default PersistLogin;
