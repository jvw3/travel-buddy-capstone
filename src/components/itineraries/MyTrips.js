//I need to get all the itineraries for a user.
import { useEffect, useState } from "react";
import { Itinerary } from "./Itinerary";
import { CurrentTrip } from "./CurrentTrip";
import { CompletedTrip } from "./Completedtrip";
import { Button, Tabs, Badge, SimpleGrid } from "@mantine/core"
import { IconSettings, IconMessageCircle, IconChecks, IconPlaneInflight, IconPlaneDeparture } from "@tabler/icons";
import "./itinerary.css";

export const MyTrips = () => {
  const [userItineraries, setUserItineraries] = useState([]);
  const [completedTripsVisibility, setCompletedTripsVisibility] =
    useState(false);

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  // useEffect(() => {
  //   fetch(`http://localhost:8099/activities`)
  //     .then((res) => res.json())
  //     .then((activitiesData) => {
  //       setActivities(activitiesData);
  //     });
  // }, []);

  // This use Effect fetches all of the itineraries for a user.
  useEffect(() => {
    fetch(
      `http://localhost:8099/userItineraries?_expand=user&_expand=itinerary&userId=${appUserObject.id}`
    )
      .then((res) => res.json())
      .then((myItinerariesArray) => {
        setUserItineraries(myItinerariesArray);
      });
  }, []);

const findUpcomingTripCount = () => {
  let upcomingTripCount = []
  userItineraries.forEach(itinerary => {
    if (itinerary?.itinerary?.isCurrent === false && itinerary?.itinerary?.isComplete === false) {
upcomingTripCount.push(itinerary)
    }
  })
  return upcomingTripCount.length
}

const findCompletedTripCount = () => {
  let completedTripCount = []
  userItineraries.forEach(itinerary => {
    if (itinerary?.itinerary?.isComplete === true) {
completedTripCount.push(itinerary)
    }
  })
  return completedTripCount.length
}


  return (
    <>
      <Tabs color="violet" variant="pills" defaultValue="upcoming">
        <Tabs.List position="center">
          <Tabs.Tab value="current" icon={<IconPlaneInflight size={14} />}>
            Current
          </Tabs.Tab>
          <Tabs.Tab value="upcoming" icon={<IconPlaneDeparture size={14} />
        }
        rightSection={
            <Badge  color="violet"
            variant="white">
              {findUpcomingTripCount()}
            </Badge>
          }>
            Upcoming
          </Tabs.Tab>
          <Tabs.Tab value="completed" icon={<IconChecks size={14} />}
          rightSection={
            <Badge  color="violet"
            variant="white">
              {findCompletedTripCount()}
            </Badge>
          }>
            Completed
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="current" pt="xs">
          <section>
            <div className="currenttripcontainer">
              {userItineraries.map((itinerary) => (
                <CurrentTrip
                  key={`itinerary--${itinerary?.id}`}
                  travelMethod={itinerary.itinerary.travelMethod}
                  departureDate={itinerary.itinerary.departureDate}
                  returnDate={itinerary.itinerary.returnDate}
                  id={itinerary?.id}
                  itineraryId={itinerary?.itineraryId}
                  isCurrent={itinerary?.itinerary?.isCurrent}
                  userItineraries={userItineraries}
                  userItineraryObject={itinerary}
                  setUserItineraries={setUserItineraries}
                />
              ))}
            </div>
          </section>
        </Tabs.Panel>
        <Tabs.Panel value="upcoming" pt="xs">
          <section>
            <h2 className="mytripsheader">My Upcoming Trips</h2>
            <div className="upcomingtrips">
              {userItineraries.map((itinerary) => (
                <Itinerary
                  key={`itinerary--${itinerary?.id}`}
                  travelMethod={itinerary.itinerary.travelMethod}
                  departureDate={itinerary.itinerary.departureDate}
                  returnDate={itinerary.itinerary.returnDate}
                  id={itinerary?.id}
                  itineraryId={itinerary?.itineraryId}
                  isCurrent={itinerary.itinerary.isCurrent}
                  isComplete={itinerary.itinerary.isComplete}
                  userItineraries={userItineraries}
                  userItineraryObject={itinerary}
                  setUserItineraries={setUserItineraries}
                />
              ))}
            </div>
          </section>
        </Tabs.Panel>

        <Tabs.Panel value="completed" pt="xs">
          <section>
            <h2 className="mytripsheader">My Completed Trips</h2>
            <div className="upcomingtrips">
              {userItineraries.map((itinerary) => (
                <CompletedTrip
                  key={`itinerary--${itinerary?.id}`}
                  travelMethod={itinerary.itinerary.travelMethod}
                  departureDate={itinerary.itinerary.departureDate}
                  returnDate={itinerary.itinerary.returnDate}
                  id={itinerary?.id}
                  itineraryId={itinerary?.itineraryId}
                  isCurrent={itinerary.itinerary.isCurrent}
                  isComplete={itinerary?.itinerary?.isComplete}
                  userItineraries={userItineraries}
                  userItineraryObject={itinerary}
                  setUserItineraries={setUserItineraries}
                />
              ))}
            </div>
          </section>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
