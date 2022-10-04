import {useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button, Card, Text, Blockquote, Title } from "@mantine/core";

export const HomePageView = () => {
const navigate= useNavigate();

  return (
    <>
      <div className="topsection">
        <div class="topsectionoverlay">
          <div class="welcomemessage"></div>
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
        </div>
      </div>
      <section className="bottomsection">
        <div class="infocardsbox">
          <h2>How it works</h2>
          <section className="firstcard">
            <Card className="homepagecard">
              <Text>Plan</Text>
              <div className="planimage"></div>
              <Text>
                Travel Buddy allows for users to plan for trips by creating
                itineraries. Users can add transportation and accommodation
                information, and also create a schedule of activities for their
                trip.{" "}
              </Text>
            </Card>
            <div class="logocontainer">
              <div class="firstcardlogo"></div>
            </div>
          </section>
          <section className="firstcard">
            <div class="logocontainer">
              <h2>Travel Buddy</h2>
            </div>
            <Card className="homepagecard">
              <Text>Travel</Text>
              <div className="travelimage"></div>
              <Text>Go on an adventure and make memories!</Text>
            </Card>
          </section>
          <section className="firstcard">
            <Card className="homepagecard">
              <Text>Share</Text>
              <Blockquote cite="– Ibn Battuta" color="violet">
                Traveling – it leaves you speechless, then turns you into a
                storyteller.
              </Blockquote>
              <Text>
                Don't keep your thoughts to yourself. Share the reviews of your
                activities and experiences, with other travelers!
              </Text>
            </Card>
            <div class="logocontainer"></div>
          </section>
        </div>
      </section>
      <footer></footer>
    </>
  );
};
