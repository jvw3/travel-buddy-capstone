import { Blockquote, Group, Card, Text, Image, Button} from "@mantine/core";
import "./community.css";
import { useNavigate } from "react-router-dom";

export const CommunityPage = () => {
  
  const navigate = useNavigate();
  
    return (
      <>
        <Blockquote>
          A journey well shared is a journey well enjoyed.
        </Blockquote>
        <Button
        color="violet"
          onClick={() => {
            navigate("/community/reviews");
          }}
        >
          Reviews
        </Button>
        <Group grow>
          <Card className="communitycard" withBorder>
            <Image
              height={200}
              src="https://images.unsplash.com/photo-1473625247510-8ceb1760943f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1711&q=80"
            />
            <Text>Travel</Text>
          </Card>
          <Card className="communitycard" withBorder>
            <Text>Review</Text>
          </Card>
          <Card className="communitycard" withBorder>
            <Image
              height={200}
              fit="contain"
              src="https://images.unsplash.com/photo-1575198917159-b60629bdb09a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <Text>Share</Text>
          </Card>
        </Group>
      </>
    );
};
