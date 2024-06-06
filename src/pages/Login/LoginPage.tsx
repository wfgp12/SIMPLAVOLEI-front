// Actions
import { loginAction } from "../../redux/slices/authSlice";

// Libraries
import React from "react";
import { Link } from "react-router-dom";

// Models
import { LoginForm } from "../../models/auth";

// Store - hooks
import { useAppDispatch } from "../../redux/store/hooks";

// Styles
import "./LoginPage.scss";
import { loginService } from "../../service/auth/auth.service";
import { useForm } from "../../hooks/useForm";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const {values, handleChange} = useForm<LoginForm>({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginService(values.email, values.password);
    if (!response) return;

    const { user, token } = response;
    dispatch(
      loginAction({
        user,
        token
      })
    );
    return;
  };

  return (
    <div className="LoginPage">
      <div>
        <h1>INICIO DE SESIÓN</h1>
      </div>
      <form id="loginForm" className="LoginPage__form" onSubmit={handleSubmit}>
        <div className="LoginPage__form__field">
          <label className="LoginPage__form__label">email :</label>
          <input
            type="email"
            name="email"
            className="LoginPage__form__input"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="LoginPage__form__field">
          <label className="LoginPage__form__label">password: </label>
          <input
            type="password"
            name="password"
            className="LoginPage__form__input"
            value={values.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        <button className="LoginPage__form__button" type="submit">
          Iniciar sesión
        </button>
      </form>
      <p>you do not have an account</p>
      <Link to="/register">Create Account</Link>
    </div>
  );
};

export default LoginPage;
