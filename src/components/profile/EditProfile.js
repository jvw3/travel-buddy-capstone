import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, TextInput, Card } from "@mantine/core";

// This component is responsible for allowing users to edit their profile information, by completing a put request.
export const EditProfile = () => {
  const { userId } = useParams();

  const navigate = useNavigate();

  const [currentUser, updateCurrentUser] = useState({
    fullName: "",
    email: "",
    hometown:""
  });

  useEffect(() => {
    fetch(`http://localhost:8099/users/${userId}`)
      .then((res) => res.json())
      .then(
        // TicketData will already be an object instead of an array so we don't need to get it at index 0.
        (currentUserToEdit) => {
          updateCurrentUser(currentUserToEdit);
        }
      );
  }, [userId]);


  const userProfilePutRequest = (event) => {
    event.preventDefault();

    return fetch(
      `http://localhost:8099/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      }
    )
      .then((res) => res.json())

      .then(() => {
        navigate(-1);
      });
  };

  return (
    <main className="maincontainer">
      <Card className="profileeditcard" withBorder shadow="xl">
        <form>
          <fieldset>
            <div>
              <TextInput
                required
                label="Full Name"
                autoFocus
                type="text"
                value={currentUser?.fullName}
                onChange={(evt) => {
                  const copy = { ...currentUser };
                  copy.fullName = evt.target.value;
                  updateCurrentUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <TextInput
                required
                label="Email Address"
                description="If you change your email address, the new email will be used to sign in."
                autoFocus
                type="text"
                value={currentUser?.email}
                onChange={(evt) => {
                  const copy = { ...currentUser };
                  copy.email = evt.target.value;
                  updateCurrentUser(copy);
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="departure">
              <TextInput
                required
                label="Hometown"
                autoFocus
                type="text"
                value={currentUser?.hometown}
                onChange={(evt) => {
                  const copy = { ...currentUser };
                  copy.hometown = evt.target.value;
                  updateCurrentUser(copy);
                }}
              />
            </div>
          </fieldset>

          <Button
            color="violet"
            onClick={(clickEvent) => userProfilePutRequest(clickEvent)}
            className="btn btn-primary"
          >
            Save Changes!
          </Button>
        </form>
      </Card>
    </main>
  );
};
