import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { loginRoute } from "../../utils/apiroute";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOption = {
    position: "bottom-right",
    autoClose: 9000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation", loginRoute);

      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password and Confirm password does not match", toastOption);
      console.log(
        `Password Error ${password} and confirm password: ${confirmPassword}`
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOption);
      return false;
    } else if (password.length < 3) {
      toast.error("Password should have atleast 8 characters", toastOption);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOption);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Chatty</h1>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>

          <span>
            Already have an account ? <Link to="/login">LOGIN</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 1.5rem;
    padding: 3rem 5rem;
    background-color: rgba(
      0,
      0,
      0,
      0.5
    ); /* Optional: Add a background for better visibility */

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0; /* Fixed border property */
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transformation: uppercase;
      transition: 0ms.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
