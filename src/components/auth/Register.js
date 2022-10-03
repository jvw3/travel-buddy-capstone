import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Card, Button, Title, Center} from "@mantine/core"

export const Register = (props) => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    hometown: "",
    isAdmin: false,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    return fetch("http://localhost:8099/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "travelbuddy_user",
            JSON.stringify({
              id: createdUser.id,
              admin: createdUser.isAdmin,
            })
          );

          navigate("/");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8099/users?email=${user.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          // Duplicate email. No good.
          window.alert("Account with that email address already exists");
        } else {
          // Good email, create user.
          registerNewUser();
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="registercontainer">
      <Card>
        <form className="form--login" onSubmit={handleRegister}>
          <Title>Travel Buddy Registration</Title>
          <fieldset>
            <TextInput
              label="Full Name"
              description="Please enter first and last name"
              onChange={updateUser}
              type="text"
              id="fullName"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <TextInput
              label="Email Address"
              description="Please enter a valid email address"
              onChange={updateUser}
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
          </fieldset>
          <fieldset>
            <TextInput
              label="Hometown"
              description="Where are you currently located?"
              onChange={updateUser}
              type="text"
              id="hometown"
              placeholder=""
              required
            />
          </fieldset>
          <fieldset>
            <Center>
              <Button color="violet" type="submit">
                {" "}
                Create Account{" "}
              </Button>
            </Center>
          </fieldset>
        </form>
      </Card>
    </main>
  );
};
