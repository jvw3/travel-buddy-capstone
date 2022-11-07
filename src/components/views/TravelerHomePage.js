import {useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button, Card, Text, Blockquote, Title } from "@mantine/core";
import { useRef, useEffect, useState } from "react";
import { useInView} from "react-intersection-observer";
import { TravelerNavBar } from "../navbar/TravelerNav";

// This component is responsible for rendering the home page view for a traveler user.
export const HomePageView = () => {
const navigate= useNavigate();
// IntersectionObserver enables scroll triggered animations
const { ref: shareRef, inView: shareSectionVisible} = useInView({
  threshold: 0.6
});
// IntersectionObserver enables scroll triggered animations
const { ref: travelRef, inView: travelSectionVisible} = useInView({
  threshold: 0.3
});
// IntersectionObserver enables scroll triggered animations
const { ref: planRef, inView: planSectionVisible} = useInView({
  threshold: 0.6
});
// IntersectionObserver enables scroll triggered animations
const { ref: travelQuoteRef, inView: travelQuoteVisible} = useInView({
  threshold: 0.6
});
// IntersectionObserver enables scroll triggered animations
const { ref: ibnQuoteRef, inView: ibnQuoteVisible} = useInView({
  threshold: 0.6
});
// IntersectionObserver enables scroll triggered animations
const { ref: traveldescriptionRef, inView: travelDescriptionVisible} = useInView({
  threshold: 0.6
});

const setTravelClass = () => {
return <>
{ travelSectionVisible
  ? <Title ref={travelRef} color="white" className="travelheaderanimate">
            Travel.
        </Title>
  : <Title ref={travelRef} color="white" className="travelheader">
            Travel.
        </Title>

}
</>
}

const setPlanClass = () => {
return <>
{ planSectionVisible
  ? <Title ref={planRef} color="white" className="travelheaderanimate">
            Plan.
        </Title>
  : <Title ref={planRef} color="white" className="travelheader">
            Plan.
        </Title>

}
</>
}

const setShareClass = () => {
return <>
{ shareSectionVisible
  ? <Title ref={shareRef} color="white" className="travelheaderanimate">
            Share.
        </Title>
  : <Title ref={shareRef} color="white" className="travelheader">
            Share.
        </Title>

}
</>
}

const setFirstTravelQuote = () => {
return <>
{ travelQuoteVisible
  ? <Text ref={travelQuoteRef} color="white" className="travelquoteanimate">
            A journey well shared is a journey well enjoyed. -Unknown
        </Text>
  : <Text ref={travelQuoteRef} color="white" className="travelquote">
            A journey well shared is a journey well enjoyed. -Unknown
        </Text>

}
</>
}

const setSecondTravelQuote = () => {
return <>
{ ibnQuoteVisible
  ? <Text ref={ibnQuoteRef} color="white" className="travelquoteanimate">
            Traveling – it leaves you speechless, then turns you into a storyteller.” – Ibn Battuta
        </Text>
  : <Text ref={ibnQuoteRef} color="white" className="travelquote">
            Traveling – it leaves you speechless, then turns you into a storyteller.” – Ibn Battuta
        </Text>

}
</>
}

  return (
    <>
      <div className="topsection">
        <div className="topsectionoverlay">
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
            <div className="getstartedbutton">
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
          <div className="firstcardlogo"></div>
        </div>
      </div>
      <div className="bottomsection">
        <div className="infocardsbox">
        <div className="firstcontainer">
          {setPlanClass()}
          <Card className="plancard">
            <div className="photo"></div>
          </Card>
        </div>
        <div className="secondcontainer">
          {setTravelClass()}
        </div>
        <div className="thirdcontainer">
          {setShareClass()}
          <div className="quotebox">
          {setFirstTravelQuote()}
          {setSecondTravelQuote()}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
