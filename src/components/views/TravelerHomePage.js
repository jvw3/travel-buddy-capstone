import {useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button, Card, Text, Blockquote, Title } from "@mantine/core";

// This component is responsible for rendering the home page view for a traveler user.
export const HomePageView = () => {
const navigate= useNavigate();

  return (
    <>
      <div className="topsection">
        <div class="topsectionoverlay">
          <div className="getstartedtext">
            <Title className="homepageheader">
              Plan the trip of your{" "}
              <Text
                className="highlightedText"
                variant="gradient"
                gradient={{ from: "violet", to: "blue" }}
              >
                dreams
              </Text>{" "}
              today!
            </Title>
            <Button
              variant="gradient"
              gradient={{ from: "violet", to: "blue" }}
              size="lg"
              onClick={() => {
                navigate("/createnewtrip");
              }}
            >
              Get Started
            </Button>
          </div>
          <div class="firstcardlogo"></div>
        </div>
      </div>
    </>
  );
};
