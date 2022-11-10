import {useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Button, Card, Text, Blockquote, Title, Center } from "@mantine/core";
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

const { ref: planQuoteRef, inView: planQuoteVisible} = useInView({
  threshold: 0.6
});

const { ref: shareQuoteRef, inView: shareQuoteVisible} = useInView({
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

const setPlanQuote = () => {
return <>
{ planQuoteVisible
  ? <Text ref={planQuoteRef} color="white" className="planquoteanimate">
            The trip of your dreams is only a few clicks away!
            <br />
            <br />
            Travel Buddy allows users plan trips using itineraries. Users can choose from 25+ cities to travel from, and a variety of activities to their itineraries.

        </Text>
  : <Text ref={planQuoteRef} color="white" className="planquote">
            The trip of your dreams is only a few clicks away!
            <br />
            <br />
            Travel Buddy allows users plan trips using itineraries. Users can choose from 25+ cities to travel from, and a variety of activities to their itineraries.
        </Text>

}
</>
}

const setTravelQuote = () => {
return <>
{ travelQuoteVisible
  ? <Text ref={travelQuoteRef} color="white" className="planquoteanimate">
            Travel the world and make memories that will last a lifetime!
            <br />
            <br />
            “To Travel is to Live” – Hans Christian Andersen

        </Text>
  : <Text ref={travelQuoteRef} color="white" className="planquote">
            Travel the world and make memories that will last a lifetime!
            <br />
            <br />
            “To Travel is to Live” – Hans Christian Andersen
        </Text>

}
</>
}

const setFirstShareQuote = () => {
return <>
{ shareQuoteVisible
  ? <Text ref={shareQuoteRef} color="white" className="sharequoteanimate">
            A journey well shared is a journey well enjoyed. -Unknown
        </Text>
  : <Text ref={shareQuoteRef} color="white" className="sharequote">
            A journey well shared is a journey well enjoyed. -Unknown
        </Text>

}
</>
}

const setSecondShareQuote = () => {
return <>
{ ibnQuoteVisible
  ? <Text ref={ibnQuoteRef} color="white" className="sharequoteanimate">
            Traveling – it leaves you speechless, then turns you into a storyteller.” – Ibn Battuta
        </Text>
  : <Text ref={ibnQuoteRef} color="white" className="sharequote">
            Traveling – it leaves you speechless, then turns you into a storyteller.” – Ibn Battuta
        </Text>

}
</>
}

  return (
    <>
      <div className="topsection">
        <div className="topsectionoverlay">
        <div className="firstcardlogo"></div>
          <div className="getstartedtext">
            <Center>
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
            </Center>
              <Center>
            <Button
              className="createformbutton"
              variant="gradient"
              gradient={{ from: "violet", to: "blue" }}
              size="lg"
              onClick={() => {
                navigate("/createnewtrip");
              }}
            >
              Get Started
            </Button>
              </Center>
          </div>
        </div>
      </div>
      <div className="bottomsection">
        <div className="infocardsbox">
        <div className="firstcontainer">
          {setPlanClass()}
          <div className="quotebox">
          {setPlanQuote()}
          </div>
        </div>
        <div className="secondcontainer">
          {setTravelClass()}
          <div className="quotebox">
          {setTravelQuote()}
          </div>
        </div>
        <div className="thirdcontainer">
          {setShareClass()}
          <div className="sharequotebox">
          {setFirstShareQuote()}
          {setSecondShareQuote()}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
