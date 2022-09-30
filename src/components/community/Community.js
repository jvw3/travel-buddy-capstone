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
              <Title color="white" order={1} size={100}>
                Plan.{" "}
              </Title>
              <Title color="white" order={1} size={100}>
                Travel.{" "}
              </Title>
              <Title color="white" order={1} size={100}>
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
                Share reviews of activities and experiences with your fellow
                travelers. Your review could lead to an amazing experience for someone else!
              </Text>
              <Card.Section withBorder p={10}>
                <Button
                  fullWidth
                  color="violet"
                  onClick={() => {
                    navigate("/community/reviews");
                  }}
                >
                  Reviews
                </Button>
              </Card.Section>
            </Card>
          </div>
        </div>
      </>
    );
};
