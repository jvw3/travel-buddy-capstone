import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react"
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications"
import { Card, Text, Button} from "@mantine/core"

export const AdminUserSettings = () => {
const navigate = useNavigate()
const {id} = useParams()

const [user, update] = useState({
  fullName: "",
  email: "",
  hometown: "",
  isAdmin: false,
  isSuspended: false
});

useEffect(() => {
  fetch(`http://localhost:8099/users/${id}`)
    .then((res) => res.json())
    .then(
      // TicketData will already be an object instead of an array so we don't need to get it at index 0.
      (userToSuspend) => {
        update(userToSuspend);
      }
    );
}, [id]);

const suspendUserOnClick = () => {
  return (
    <Button
      variant="light"
      color="red"
      onClick={() => {
        suspendUserConfirmation();
      }}
    >
      Suspend User
    </Button>
  );
};

const removeSuspensionOnClick = () => {
  return (
    <Button
      variant="light"
      color="red"
      onClick={() => {
        removeSuspensionConfirmation();
      }}
    >
      End Suspension
    </Button>
  );
};

const suspendUserConfirmation = () =>
  openConfirmModal({
    title: `Are you sure you want to suspend ${user.fullName}`,
    children: <Text size="sm">Please click confirm or cancel to proceed.</Text>,
    labels: { confirm: "Confirm", cancel: "Cancel" },
    onCancel: () => "",
    onConfirm: (event) => suspendUserStatusPut(event),
  });

const removeSuspensionConfirmation = () =>
  openConfirmModal({
    title: `Are you sure you want to end ${user.fullName}'s suspension?`,
    children: <Text size="sm">Please click confirm or cancel to proceed.</Text>,
    labels: { confirm: "Confirm", cancel: "Cancel" },
    onCancel: () => "",
    onConfirm: (event) => removeSuspensionStatusPut(event),
  });

  const suspendUserStatusPut = (event) => {
    const updatedUserToApi = {
      fullName: user.fullName,
      email: user.email,
      hometown: user.hometown,
      isAdmin: user.isAdmin,
      isSuspended: true,
    };

    return fetch(`http://localhost:8099/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserToApi),
    })
      .then((res) => res.json())
      .then(() => {
        showNotification({
          title: "ATTENTION",
          message: `${user.fullName} has been suspended.`,
        });
      })
      .then(() => {
        navigate(-1);
      });
  };

  const removeSuspensionStatusPut = (event) => {
    const updatedUserToApi = {
      fullName: user.fullName,
      email: user.email,
      hometown: user.hometown,
      isAdmin: user.isAdmin,
      isSuspended: false,
    };

    return fetch(`http://localhost:8099/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserToApi),
    })
      .then((res) => res.json())
      .then(() => {
        showNotification({
          title: "ATTENTION",
          message: `${user.fullName}'s suspension has ended.`,
        });
      })
      .then(() => {
        navigate(-1);
      });
  };



return (
  <>
    {user.isSuspended ? (
      <Card className="usercard" withBorder>
        <Text>{user.fullName}</Text>
        <Text>{user.email}</Text>
        <Text>{user.hometown}</Text>
        {removeSuspensionOnClick()}
      </Card>
    ) : (
      <Card className="usercard" withBorder>
        <Text>{user.fullName}</Text>
        <Text>{user.email}</Text>
        <Text>{user.hometown}</Text>
        {suspendUserOnClick()}
      </Card>
    )}
  </>
);
}