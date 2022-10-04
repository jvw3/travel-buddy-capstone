import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ActivitySchedule } from "./ActivitySchedule";
import "./IndividualTripDetails.css";
import { TextInput, Button, Timeline, Text, Drawer, Group, Title } from "@mantine/core";
import { Card } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

export const IndividualTripDetails = ({}) => {
  const { usertripId } = useParams();
  const [activities, setActivities] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [userItinerary, updateUserItinerary] = useState();
  const [destination, updateDestination] = useState();
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const [itineraryActivity, updateItineraryActivity] = useState({
    activityId: 0,
    description: "",
    rating: "",
    activityDateTime: "",
    review: {
      rating: "",
      description: "",
    },
    isPublic: "",
    isComplete: "",
    isFavorited: "",
    reviewIdentity: "",
    flags: "",
  });

  const [activity, updateActivity] = useState({
    name: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8099/itineraries`)
      .then((res) => res.json())
      .then((itinerariesData) => {
        setItineraries(itinerariesData);
      });
  }, []);

  //This useEffect fetches the array of itineraries from the API, stores it as activitiesData, then setActivities setterFunction uses activitiesData to set the activities stateVariable.
  useEffect(() => {
    fetch(`http://localhost:8099/activities`)
      .then((res) => res.json())
      .then((activitiesData) => {
        setActivities(activitiesData);
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:8099/itineraryActivities?_expand=activity&itineraryId=${usertripId}`
    )
      .then((res) => res.json())
      .then((itineraryActivitiesData) => {
        setItineraryActivities(itineraryActivitiesData);
      });
  }, []);

  const getUpdatedActivityListForUser = () => {
    fetch(
      `http://localhost:8099/itineraryActivities?_expand=activity&itineraryId=${usertripId}`
    )
      .then((res) => res.json())
      .then((itineraryActivitiesArray) => {
        setItineraryActivities(itineraryActivitiesArray);
      });
  };

  const getUpdatedActivitiesList = () => {
    fetch(`http://localhost:8099/activities`)
      .then((res) => res.json())
      .then((activitiesArray) => {
        setActivities(activitiesArray);
      });
  };

  const postItineraryActivity = (event) => {
    event.preventDefault();

    const itineraryActivityToAPI = {
      itineraryId: parseInt(userItinerary?.itineraryId),
      activityId: parseInt(itineraryActivity.activityId),
      description: itineraryActivity.description,
      address: itineraryActivity.address,
      activityDateTime: itineraryActivity.activityDateTime,
      review: {
        rating: "",
        description: "",
      },
      isPublic: false,
      isComplete: false,
      isFavorited: false,
      reviewIdentity: "",
      flags: [0],
    };

    return fetch(`http://localhost:8099/itineraryActivities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryActivityToAPI),
    })
      .then((res) => res.json())
      .then(() => {
        getUpdatedActivityListForUser();
      });
  };
  

  // This useEffect hook fetches the specific itinerary for the current user.
  useEffect(() => {
    fetch(
      `http://localhost:8099/userItineraries?_expand=itinerary&itineraryId=${usertripId}`
    )
      .then((res) => res.json())
      .then((trip) => {
        const individualTrip = trip[0];
        updateUserItinerary(individualTrip);
      });
  }, [usertripId]);

  // This useEffect hook fetches the specific trip location for the current user's itinerary.
  useEffect(() => {
    fetch(
      `http://localhost:8099/itineraryLocations?_expand=location&itineraryId=${usertripId}`
    )
      .then((res) => res.json())
      .then((destination) => {
        const myDestination = destination[0];
        updateDestination(myDestination);
      });
  }, [usertripId]);

  // This useEffect Hooks fetches all of the activities.
  useEffect(() => {
    fetch(`http://localhost:8099/activities`)
      .then((res) => res.json())
      .then((activitiesData) => {
        setActivities(activitiesData);
      });
  }, []);

  const foundItinerary = itineraries.find(
    (itinerary) => itinerary.id === userItinerary?.itineraryId
  );

  const renderDeleteItineraryButton = () => {
    return (
      <Button
        color="red"
        onClick={() => {
          if (window.confirm("Press OK to confirm your delete.")) {
            fetch(`http://localhost:8099/itineraries/${foundItinerary.id}`, {
              method: "DELETE",
            }).then(() => {
              navigate("/trips");
            });
          } else {
            return "";
          }
        }}
      >
        Delete Trip
      </Button>
    );
  };

  const postActivity = (event) => {
    event.preventDefault();

    const activityToAPI = {
      name: activity.name,
    };

    return fetch(`http://localhost:8099/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activityToAPI),
    })
      .then((res) => res.json())
      .then(() => {
        getUpdatedActivitiesList();
      })
      .then(() => {
        showNotification({
          title: "Notification",
          message: "Activity submission successful!",
        });
      });
  };

  const addActivityButton = () => {
    return (
      <Button
      color="violet"
      compact
        onClick={(event) => {
          if (activity.name === "") {
            window.alert("add text to add an activity");
          } else {
            postActivity(event);
          }
        }}
      >
        Add activity!
      </Button>
    );
  };

  // This function opens a Mantine Drawer (sidebar) that allows the user to create a new activity using the form. 
  const openActivitySideBar = () => {
    return (
      <>
        <Drawer
          opened={opened}
          position="right"
          onClose={() => setOpened(false)}
          title="Register"
          padding="xl"
          size="xl"
        >
          {
            <form>
              <div className="row g-3">
                <fieldset>
                  <div className="col-md-6">
                    <label htmlFor="name">Choose Activity:</label>
                    <select
                      value={itineraryActivity.activityId}
                      required
                      autoFocus
                      onChange={(evt) => {
                        const copy = { ...itineraryActivity };
                        copy.activityId = evt.target.value;
                        updateItineraryActivity(copy);
                      }}
                    >
                      <option value="0">Choose your Activity</option>
                      {activities.map((activity) => {
                        return (
                          <option value={activity.id} key={activity.id}>
                            {activity.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </fieldset>
                <fieldset>
                  <div className="col-md-6">
                    <TextInput
                      required
                      width={300}
                      autoFocus
                      label="Add Activity"
                      description='Any created activity can be chosen from dropdown, after "Add Activity" button is clicked.'
                      type="text"
                      value={activity.name}
                      onChange={(evt) => {
                        const copy = { ...activity };
                        copy.name = evt.target.value;
                        updateActivity(copy);
                      }}
                    />
                  </div>
                  {addActivityButton()}
                </fieldset>
              </div>
              <fieldset>
                <div>
                  <TextInput
                    autoFocus
                    label="Description"
                    description="Describe the Activity"
                    type="text"
                    width={300}
                    value={itineraryActivity.description}
                    onChange={(evt) => {
                      const copy = { ...itineraryActivity };
                      copy.description = evt.target.value;
                      updateItineraryActivity(copy);
                    }}
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="departure">
                  <label htmlFor="description">Activity Time and Date:</label>
                  <input
                    autoFocus
                    className="form-control"
                    type="datetime-local"
                    value={itineraryActivity.activityDateTime}
                    onChange={(evt) => {
                      const copy = { ...itineraryActivity };
                      copy.activityDateTime = evt.target.value;
                      updateItineraryActivity(copy);
                    }}
                  />
                </div>
              </fieldset>
              <fieldset>
                <div>
                  <TextInput
                    autoFocus
                    description="Where is this activity located?"
                    label="Activity Address"
                    type="text"
                    width={300}
                    value={itineraryActivity.address}
                    onChange={(evt) => {
                      const copy = { ...itineraryActivity };
                      copy.address = evt.target.value;
                      updateItineraryActivity(copy);
                    }}
                  />
                </div>
              </fieldset>
              <Button
                color="violet"
                onClick={(clickEvent) => postItineraryActivity(clickEvent)}
                className="btn btn-primary"
              >
                Add to Itinerary!
              </Button>
            </form>
          }
        </Drawer>

        <Group position="center">
          <Button color="violet" onClick={() => setOpened(true)}>
            Add New Activity
          </Button>
        </Group>
      </>
    );
  }



  return (
    <>
      <main>
        <section className="full-trip-view">
          <section className={destination?.location.city + "tripheader"}>
            <div className="headeroverlay">
              <h2>
                Traveling to {destination?.location?.city},{" "}
                {destination?.location?.state}
              </h2>
              <div>
                <Button
                  radius="md"
                  variant="white"
                  onClick={() => {
                    navigate(
                      `/trips/${userItinerary?.itineraryId}/editItinerary`
                    );
                  }}
                >
                  <Text color="violet">Edit Itinerary</Text>
                </Button>
                {renderDeleteItineraryButton()}
              </div>
              <h3 class="departuredate">
                Leaving on: {userItinerary?.itinerary?.departureDate}
              </h3>
              <h3 class="returndate">
                Returning on: {userItinerary?.itinerary?.returnDate}
              </h3>
            </div>
          </section>
          <div className="transportationinfo">
            <Card className="flightinfo" shadow="xl">
              <Card.Section className="titlesection" withBorder>
                <h4>Flight Info:</h4>
              </Card.Section>
              <div>
                Flight to {destination?.location?.city}:{" "}
                {userItinerary?.itinerary?.flightInfo?.departFlightNum} leaving
                at:{" "}
                {userItinerary?.itinerary?.flightInfo?.flightToDestinationTime}
              </div>
              <div>
                Return Flight:{" "}
                {userItinerary?.itinerary?.flightInfo?.returnFlightNum} leaving
                at: {userItinerary?.itinerary?.flightInfo?.returnFlightTime}{" "}
              </div>
            </Card>
            <Card className="rentalinfo" shadow="xl">
              <h4>Rental Car Info:</h4>
              <div>
                Renting from:
                {userItinerary?.itinerary?.rentalCarInfo?.rentalCompany}
              </div>
              <div>
                Reservation #:{" "}
                {userItinerary?.itinerary?.rentalCarInfo?.reservationNum}
              </div>
              <div>
                Reservation start:{" "}
                {userItinerary?.itinerary?.rentalCarInfo?.reservationTime}
              </div>
              <div>
                Car Drop off Time:{" "}
                {userItinerary?.itinerary?.rentalCarInfo?.carDropOffTime}
              </div>
            </Card>
          </div>
        </section>
        <div className="scheduleandactivities">
          <section className="schedulecontainer">
            <Title>My Schedule</Title>
            {openActivitySideBar()}
            <section className="schedulelist">
              <Timeline color="violet" lineWidth={1}>
                {itineraryActivities.map((itineraryActivity) => (
                  <ActivitySchedule
                    key={`itineraryActivity--${itineraryActivity?.id}`}
                    itineraryActivityObject={itineraryActivity}
                    activity={itineraryActivity?.activity?.name}
                    activityDescription={itineraryActivity?.description}
                    activityAddress={itineraryActivity?.address}
                    activityDateTime={itineraryActivity?.activityDateTime}
                    review={itineraryActivity?.review?.description}
                    setItineraryActivities={setItineraryActivities}
                    isComplete={itineraryActivity?.isComplete}
                    isFavorited={itineraryActivity?.isFavorited}
                    id={itineraryActivity?.id}
                    itineraryId={itineraryActivity?.itineraryId}
                    isPublic={itineraryActivity?.isPublic}
                  />
                ))}
              </Timeline>
            </section>
          </section>
        </div>
      </main>
    </>
  );
};
