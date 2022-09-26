//I need to get all the itineraries for a user.
import { useEffect, useState } from "react";
import { Itinerary } from "./Itinerary";
import { CurrentTrip } from "./CurrentTrip";
import { CompletedTrip } from "./Completedtrip";
import { Button, Tabs } from "@mantine/core"
import { IconSettings, IconMessageCircle, IconChecks, IconPlaneInflight, IconPlaneDeparture } from "@tabler/icons";
// import { CurrentTrip } from "./CurrentTrip"
// import { button } from "bootstrap"
import "./itinerary.css";

export const MyTrips = () => {
  const [userItineraries, setUserItineraries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [completedTripsVisibility, setCompletedTripsVisibility] =
    useState(false);

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  useEffect(() => {
    fetch(`http://localhost:8099/activities`)
      .then((res) => res.json())
      .then((activitiesData) => {
        setActivities(activitiesData);
      });
  }, []);

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

  // const renderDeleteButton = () => {
  // return <button onClick={() => {
  //     fetch(`http://localhost:8099/itineraries/${foundItinerary.id}`, {
  //         method: "DELETE"
  //     })
  //             .then(
  //         () => {
  //             getUpdatedItineraryListForUser()
  //         })
  //         .then(
  //             (userItineraries) => setUserItineraries(userItineraries)
  //         )
  // }}className="deletebutton">Delete Trip</button>
  // }

  // If isCurrent=true, display trip in CurrentTrip
  // If isCurrent === false && isCompleted === false, display in Upcoming Trips
  // If isCompleted === true, display trips in CompletedTrips
  return (
    <>
      <Tabs variant="pills" defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery" icon={<IconPlaneInflight size={14} />}>
            Current
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconPlaneDeparture size={14} />}>
            Upcoming
          </Tabs.Tab>
          <Tabs.Tab value="settings" icon={<IconChecks size={14} />}>
            Completed
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <section>
            <h2 className="mytripsheader">Current Trip</h2>
            <div class="currenttripcontainer">
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
        <Tabs.Panel value="messages" pt="xs">
          <section>
            <h2 className="mytripsheader">My Upcoming Trips</h2>
            <div class="tripsContainer">
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

        <Tabs.Panel value="settings" pt="xs">
          <section>
            <div className="completedstatusbuttons">
              <Button
                color="violet"
                variant="light"
                onClick={() => {
                  setCompletedTripsVisibility(true);
                }}
              >
                Show Completed Trips
              </Button>
              <Button
                color="violet"
                variant="light"
                onClick={() => {
                  setCompletedTripsVisibility(false);
                }}
              >
                Hide Completed Trips
              </Button>
            </div>
            {completedTripsVisibility ? (
              <div class="allcompletedtrips">
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
            ) : (
              ""
            )}
          </section>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
