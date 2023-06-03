import React, { useState } from "react";
import { verifyEmail,verifyPassword } from "./Verification";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { Link } from "react-router-dom";

const Login = () => {
  
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()


 
  const emailChange = (e) => {
    setEmailState(e.target.value);
  };
  const passwordChange = (e) => {
    setPasswordState(e.target.value);
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

    if (!checkEmail || !checkPassword) {
      return;
    }
    
    try {
      const {data} = await axios.post('/api/v1/users/login',{
        email:emailState,
        password:passwordState
      })
      if(data.success){
        localStorage.setItem("userId",data?.user._id)
        dispatch(authActions.login())
        alert("User Login Successfully")
        navigate('/blogs')
      }
    } catch (error) {
      console.log(error)
    }
  
  };


 

  return (
    <div className="container-md">
      <div className="row justify-content-center align-items-center">
        <div className={`p-4 col-md-4 col-sm-10 mt-5 shadow  bg-white rounded-3`}>
          <h3 className="text-center">Login Here ...!</h3>
          <form onSubmit={submitHandler}>
          
            <div className="mb-3">
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
            <div className="mb-3">
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
                <button className="btn btn-primary float-start mt-3" type="submit">
                  Submit
                </button>
              </div>
              <div className="col-md-6 float-end m-2">
                Not Registered ?
                <Link
                  className="nav-link"
                  to="/register"
                >
                click here to register
                </Link>
              </div>
              
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};
export default Login;