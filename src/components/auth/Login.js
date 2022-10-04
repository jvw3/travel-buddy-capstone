import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackgroundImage, Button, Card, TextInput, Alert } from "@mantine/core"
import { showNotification } from "@mantine/notifications";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8099/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers[0].isSuspended === true) {
           showNotification({
             title: "ATTENTION",
             message: "YOU HAVE BEEN SUSPENDED.",
             color: "red"
           });
        }
        else if (foundUsers.length === 1) {
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
    <>
      <main className="loginscreen">
        <section className="logincontainerleft"></section>
        <section className="logincontainerright">
          <div className="logincard">
            <Card shadow="xl" withBorder>
              <form className="form-outline mb-3" onSubmit={handleLogin}>
                <div className="loginlogo"></div>
                <fieldset>
                  <TextInput
                    type="email"
                    label="Email Address"
                    description="Please enter a valid email"
                    value={email}
                    onChange={(evt) => set(evt.target.value)}
                    className="emaillogin"
                    placeholder="Email address"
                    required
                    autoFocus
                  />
                </fieldset>
                <fieldset>
                  <button className="submitbutton">Sign in</button>
                </fieldset>
              </form>
              <Button
                radius="md"
                color="violet"
                variant="outline"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Not a member yet? Create a new account!
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};
