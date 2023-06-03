import React, { useState } from "react";
import { verifyEmail, verifyName, verifyPassword } from "./Verification";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [nameState, setNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const navigate = useNavigate();

  const nameChange = (e) => {
    setNameState(e.target.value);
  };
  const emailChange = (e) => {
    setEmailState(e.target.value);
  };
  const passwordChange = (e) => {
    setPasswordState(e.target.value);
  };

  const nameBlur = () => {
    const name = nameState;
    const nameMessage = verifyName(name);
    if (nameMessage !== null) {
      setNameError(true);
      setNameMessage(nameMessage);
      return false;
    }
    setNameError(false);
    setNameMessage("");
    return true;
  };
  const emailBlur = () => {
    const email = emailState;
    const emailMessage = verifyEmail(email);
    if (emailMessage !== null) {
      setEmailError(true);
      setEmailMessage(emailMessage);
      return false;
    }
    setEmailError(false);
    setEmailMessage("");
    return true;
  };
  const passwordBlur = () => {
    // Blur for Password
    const password = passwordState;
    const passwordMessage = verifyPassword(password);
    if (passwordMessage !== null) {
      setPasswordError(true);
      setPasswordMessage(passwordMessage);
      return false;
    }
    setPasswordError(false);
    setPasswordMessage("");
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const checkEmail = emailBlur();
    const checkPassword = passwordBlur();
    const checkName = nameBlur();

    if (!checkEmail || !checkPassword || !checkName) {
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/users/register", {
        username: nameState,
        email: emailState,
        password: passwordState,
      });
      if (data.success) {
        alert("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className={`p-4 col-md-4 col-sm-10 rounded-3 shadow  bg-white mt-5`}>
          <h3 className="text-center">Register Here</h3>
          <form onSubmit={submitHandler}>
            <div className="m-3">
              <label className="form-label" htmlFor="e-mail">
                Name
              </label>
              <input
                className={`form-control ${nameError ? "is-invalid" : ""}`}
                type="text"
                id="name"
                onChange={nameChange}
                onBlur={nameBlur}
              />
              {nameError && <span className="text-danger">{nameMessage}</span>}
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="e-mail">
                Email
              </label>
              <input
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                type="email"
                id="e-mail"
                onChange={emailChange}
                onBlur={emailBlur}
              />
              {emailError && (
                <span className="text-danger">{emailMessage}</span>
              )}
            </div>
            <div className="m-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                type="password"
                id="password"
                onChange={passwordChange}
                onBlur={passwordBlur}
              />
              {passwordError && (
                <span className="text-danger">{passwordMessage}</span>
              )}
            </div>
            <div className="flex-row m-3">
              <div className="col-md-6">
                <button className="btn btn-primary float-start mt-4" type="submit">
                  Register
                </button>
              </div>
              <div className="col-md-5 float-end mt-2">
                already Registered ?
                <Link
                  className="nav-link"
                  to="/login"
                >
                  click here to login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
