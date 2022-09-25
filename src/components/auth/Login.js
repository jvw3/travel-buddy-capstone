import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8099/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "travelbuddy_user",
            JSON.stringify({
              id: user.id,
              admin: user.isAdmin,
            })
          );

          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <main className="container--login">
      <section className="loginincard">
        <form className="form-outline mb-3" onSubmit={handleLogin}>
          <h1 className="header">Travel Buddy</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              className="emaillogin"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <Button type="submit" class="btn btn-primary btn-block">
              Sign in
            </Button>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet? Create a new account!</Link>
      </section>
    </main>
  );
};
