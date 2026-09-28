import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";

import styles from "./LoginPage.module.css";
import { useLoginMutation } from "../../services/auth/authApi";
import { setCredentials } from "../../services/auth/authSlice";

const LogoMark = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="7" height="7" fill="currentColor" />
      <rect x="10" y="1" width="7" height="7" fill="currentColor" />
      <rect x="1" y="10" width="7" height="7" fill="currentColor" />
      <rect x="10" y="10" width="7" height="7" fill="currentColor" />
    </svg>
  );
};

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Targeting the message sent from PersistLogin with useLocation()
  const location = useLocation();

  //Session expired message from the PersisLogin component
  const sessionMessage = location.state?.message;

  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState(sessionMessage || "");


  //handle change in input state if theres an error
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errMsg) setErrMsg("");
  };

  //handle change in input state if theres an error
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errMsg) setErrMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));

      setUsername("");
      setPassword("");
      navigate("/admin/dashboard");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No server Respond");
      } else if (err.status === 400) {
        setErrMsg(err.data?.message || "Missing username and password");
      } else if (err.status === 401) {
        setErrMsg(err.data?.message || "Unauthorized");
      } else {
        setErrMsg(err.status?.message || "Something went wrong");
      }
    }
  };

  const errContent = errMsg ? (
    <div className={styles.errorContent} role="alert">
      <p className={styles.errorText} ref={errRef}>
        {errMsg}
      </p>
    </div>
  ) : null;

  return (
    <div className={styles.page}>
      {errContent}
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <LogoMark />
          </span>
          <span className={styles.brandName}>BuzzAlvin Admin</span>
        </div>

        <p className={styles.tagline}>Portfolio management portal</p>

        <h1 className={styles.heading}>Log in</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>
                <FiMail size={16} />
              </span>
              <input
                id="username"
                type="text"
                required
                autoComplete="off"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>
                <FiLock size={16} />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.toggleVisibility}
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? "Logging in…" : "Log in"}
          </button>

          <Link to="#/admin/forgot-password" className={styles.forgot}>
            Forgot password?
          </Link>
        </form>

        <div className={styles.footer}>
          <p>
            Need support?{" "}
            <Link
              to="mailto:support@buzzalvin.com"
              className={styles.footerLink}
            >
              support@buzzalvin.com
            </Link>
          </p>
        </div>
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} BuzzAlvin Studio. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
