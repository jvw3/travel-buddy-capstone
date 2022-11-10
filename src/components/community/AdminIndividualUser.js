import { Card, Text, Badge, Button } from "@mantine/core"
import { openConfirmModal } from "@mantine/modals";
import { useNavigate } from "react-router-dom";


// This component is responsible for rendering the view for an individual user from the admin's view.
export const AdminIndividualUser = ({fullName, id, isSuspended}) => {
const navigate = useNavigate()

    return (
      <>
        {isSuspended ? (
          <Card className="usercard" withBorder>
            <Badge color="red">Suspended</Badge>
            <Text>{fullName}</Text>
            <Button
            color="violet"
              onClick={() => {
                navigate(`/userinfo/${id}`);
              }}
            >
              View User Information
            </Button>
          </Card>
        ) : (
          <Card className="usercard" withBorder>
            <Text>{fullName}</Text>
            <Button
              onClick={() => {
                 navigate(`/userinfo/${id}`);
              }}
              color="violet"
            >
              View User Information
            </Button>
          </Card>
        )}
      </>
    );
}