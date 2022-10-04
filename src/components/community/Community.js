import { Blockquote, Group, Card, Text, Image, Button, Title} 
from "@mantine/core";
import "./community.css";
import { useNavigate } from "react-router-dom";

export const CommunityPage = () => {
  
  const navigate = useNavigate();
  
    return (
      <>
        <div className="commmunitybackground">
          <div className="backgroundoverlay">
            <div className="communityheader">
              <Title
                className="headertext"
                variant="gradient"
                gradient={{ from: "violet", to: "blue" }}
                order={1}
                size={100}
              >
                Plan.{" "}
              </Title>
              <Title
                className="headertext"
                variant="gradient"
                gradient={{ from: "violet", to: "blue" }}
                order={1}
                size={100}
              >
                Travel.{" "}
              </Title>
              <Title
                className="headertext"
                variant="gradient"
                gradient={{ from: "violet", to: "blue" }}
                order={1}
                size={100}
              >
                Share.
              </Title>
            </div>
            <Card className="headerimagecard">
              <Card.Section withBorder p={10}>
                <Blockquote cite="-Unknown" color="violet">
                  A journey well shared is a journey well enjoyed.
                </Blockquote>
              </Card.Section>
              <Text>
                Plan your trips. Travel the world. Share your experiences. Your
                review could lead to an amazing experience for someone else!
              </Text>
              <Card.Section withBorder p={10}>
                <Button
                  fullWidth
                  color="violet"
                  onClick={() => {
                    navigate("/community/reviews");
                  }}
                >
                  View Reviews!
                </Button>
              </Card.Section>
            </Card>
          </div>
        </div>
      </>
    );
};
