import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button, Card, Text, Blockquote } from "@mantine/core";

export const HomePageView = () => {
const navigate= useNavigate();

  return (
    <>
      <div className="topsection">
        <div class="topsectionoverlay">
          <div class="welcomemessage"></div>
          <div className="getstartedtext">
            <h2 className="homepageheader">
              Plan the trip of your dreams today!
            </h2>
            <Button
              color="violet"
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
            </Card>
          </section>
          <section className="firstcard">
            <Card className="homepagecard">
              <Text>Share</Text>
              <Blockquote cite="– Ibn Battuta" color="violet">
                Traveling – it leaves you speechless, then turns you into a
                storyteller.
              </Blockquote>
            </Card>
            <div class="logocontainer"></div>
          </section>
        </div>
      </section>
      <footer></footer>
    </>
  );
};
