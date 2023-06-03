import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    dispatch(authActions.logout());
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">Blog Post</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isLogin && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <NavLink
                  className="nav-link"
                  to="/blogs"
                  style={({ isActive }) => ({
                    color: isActive ? "#7600dc" : "#545e6f",
                   
                  })}
                >
                  Blogs
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink
                  className="nav-link"
                  to="/myblogs"
                  style={({ isActive }) => ({
                    color: isActive ? "#7600dc" : "#545e6f",
                   
                  })}
                >
                  My Blogs
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink
                  className="nav-link"
                  to="/createblog"
                  style={({ isActive }) => ({
                    color: isActive ? "#7600dc" : "#545e6f",
                    
                  })}
                >
                  Create Blog
                </NavLink>
              </li>
            </ul>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!isLogin && (
              <>
                <li className="nav-item ">
                  <NavLink className="nav-link" to="/login" style={({ isActive }) => ({
                    color: isActive ? "#7600dc" : "#545e6f",
                    
                  })}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" style={({ isActive }) => ({
                    color: isActive ? "#7600dc" : "#545e6f",
                    
                  })}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {isLogin && (
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
