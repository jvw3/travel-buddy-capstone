import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ActivitySchedule } from "./ActivitySchedule";
import "./IndividualTripDetails.css";
import { TextInput, Button, Timeline, Text } from "@mantine/core";
import { Card } from "@mantine/core";
import { getAllActivities } from "../api/APImanager";
import { openModal } from "@mantine/modals";

//

export const IndividualTripDetails = ({}) => {
  const { usertripId } = useParams();
  const [activities, setActivities] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [userItinerary, updateUserItinerary] = useState();
  const [destination, updateDestination] = useState();
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [activityFormVisibility, setFormVisibility] = useState(false);
  const navigate = useNavigate();

  // useEffect(
  //     () => {
  //         if (!activityFormVisibility) {
  //             setFormVisibility(true)
  //         } else if (activityFormVisibility) {

  //         }
  //     }, [activityFormVisibility]
  // )

  //Need to get the current itineraryId for the itineraryActivity.

  // iterate through useritineraries to find itineraries for user.

  const [itineraryActivity, updateItineraryActivity] = useState({
    activityId: 0,
    description: "",
    rating: "",
    activityDateTime: "",
    review: "",
    flags: "",
    isPublic: "",
    isComplete: "",
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
      reviewIdentity: "",
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

  //map through itineraries and if itineraryId === userItineraryObject.itineraryId
  // const foundItinerary = itineraries.find(
  //   (itinerary) => itinerary.id === userItinerary?.itineraryId
  // );

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
      });
  };

  const addActivityButton = () => {
    return (
      <button
        onClick={(event) => {
          if (activity.name === "") {
            window.alert("add text to add an activity");
          } else {
            postActivity(event);
          }
        }}
      >
        Add activity!
      </button>
    );
  };

      const openActivityModalOnClick = () => {
        return (
          <Button
            fullWidth
            color="violet"
            onClick={() => {
              renderActivityFormModal();
            }}
          >
            Add Activity
          </Button>
        );
      };

      const renderActivityFormModal = () => {
        
        openModal({
          title: "Are you sure you want to delete your trip?",
          children: (
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
          )
        });
      };

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
              <div className="accessCode">
                Access code: {userItinerary?.itinerary?.accessCode}
              </div>
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
            <Card className="flightinfo" >
              <h4>Flight Info:</h4>
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
            <Card className="rentalinfo" >
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
            <h3>My Schedule</h3>
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
                    id={itineraryActivity?.id}
                    itineraryId={itineraryActivity?.itineraryId}
                    isPublic={itineraryActivity?.isPublic}
                  />
                ))}
              </Timeline>
            </section>
          </section>
          <div class="activitiesform">
            <section>
              {openActivityModalOnClick()}
              <h3>Activities</h3>
              <Button
              color="violet"
                onClick={() => {
                  setFormVisibility(true);
                }}
              >
                Display Activity Form
              </Button>
              <Button
              color="violet"
                onClick={() => {
                  setFormVisibility(false);
                }}
              >
                Hide Activity Form
              </Button>
            </section>
            {activityFormVisibility ? (
              <>
                <section>
                  <Text>The form below allows you to add trips to your schedule, or add activities to a saved list of activities. </Text>
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
                        <label htmlFor="description">
                          Activity Time and Date:
                        </label>
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
                      onClick={(clickEvent) =>
                        postItineraryActivity(clickEvent)
                      }
                      className="btn btn-primary"
                    >
                      Add to Itinerary!
                    </Button>
                  </form>
                </section>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
    </>
  );
};
