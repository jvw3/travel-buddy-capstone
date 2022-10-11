import { useEffect, useState } from "react";
import { Card, Tabs, Badge } from "@mantine/core";
import { IconPlaneInflight, IconStar } from "@tabler/icons";
import { MyActivity } from "./myActivity";
import { MyFavoriteActivity } from "./MyFavoriteActivity";

// This component is responsible for rendering a list of all of the activities for a user's profile. This component will also be passed searchTermState as a prop, so that search terms can be used to filter search results.
export const MyActivities = ({ searchTermState }) => {
  const [user, setUser] = useState({});
  const [userItineraries, setUserItineraries] = useState([]);
  const [itineraryActivities, setItineraryActivities] = useState([]);
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [filteredActivities, setFiltered] = useState([]);
  const [searchedActivities, setSearched] = useState([]);
  const [filteredFavoriteActivities, setFilteredFavorites] = useState([]);

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

  // This useEffect hook fetches the current User.
  useEffect(() => {
    fetch(`http://localhost:8099/users/${appUserObject.id}`)
      .then((res) => res.json())
      .then((currentUserInfo) => {
        setUser(currentUserInfo);
      });
  }, []);

  // This useEffect hook fetches the array of Itinerary Activities.
  useEffect(() => {
    fetch(`http://localhost:8099/itineraryActivities?_expand=activity`)
      .then((res) => res.json())
      .then((activities) => {
        setItineraryActivities(activities);
      });
  }, []);

  // This useEFfect hook fetches all of the user Itineraries for the current user.
  useEffect(() => {
    fetch(`http://localhost:8099/userItineraries?userId=${appUserObject.id}`)
      .then((res) => res.json())
      .then((userItinerariesArray) => {
        setUserItineraries(userItinerariesArray);
      });
  }, []);

  // This useEffect hook will
  // useEffect(() => {
  //   const userActivities = [];
  //   userItineraries.forEach((itinerary) => {
  //     itineraryActivities.forEach((activity) => {
  //       if (activity.itineraryId === itinerary.itineraryId) {
  //         userActivities.push(activity);
  //       }
  //     });
  //   });
  //   setFiltered(userActivities);
  // }, []);

  useEffect(() => {
    const userFavoriteActivities = [];
    userItineraries.forEach((itinerary) => {
      if (itinerary.itinerary.isFavorited === true) {
        itineraryActivities.forEach((activity) => {
          if (activity.itineraryId === itinerary.itineraryId) {
            userFavoriteActivities.push(activity);
          }
        });
      }
    });
    setFavoriteActivities(userFavoriteActivities);
  }, []);


  useEffect(() => {
    const userFavoriteActivities = [];
    userItineraries.forEach((itinerary) => {
      if (itinerary.itinerary.isFavorited === true) {
        itineraryActivities.forEach((activity) => {
          if (activity.itineraryId === itinerary.itineraryId) {
            userFavoriteActivities.push(activity);
          }
        });
      }
    });

    const searchedFavActivities = userFavoriteActivities.filter((activity) => {
      return activity.activity.name
        .toLowerCase()
        .includes(searchTermState.toLowerCase());
    })
    setFilteredFavorites(searchedFavActivities);
  }, []);

  // This useEffect hook sets the search Term State for the activity Container component, which will maintains state for the activity Search component.
  useEffect(() => {
    const userActivities = [];
    userItineraries.forEach((itinerary) => {
      itineraryActivities.forEach((activity) => {
        if (activity.itineraryId === itinerary.itineraryId) {
          userActivities.push(activity);
        }
      });
    });

    const searchedActivities = userActivities.filter((activity) => {
      return activity.activity.name
        .toLowerCase()
        .includes(searchTermState.toLowerCase());
    });
    setSearched(searchedActivities);
  }, [searchTermState]);



  const displayFilteredActivities = () => {

    const userActivities = [];
    userItineraries.forEach((itinerary) => {
      itineraryActivities.forEach((activity) => {
        if (activity.itineraryId === itinerary.itineraryId) {
          userActivities.push(activity);
        }
      });
    });

    return (
      <>
        {searchTermState === "" ? (
          <div className="container">
            {userActivities.map((activity) => (
              <MyActivity
                key={`itineraryActivity--${activity?.id}`}
                description={activity?.description}
                activity={activity?.activity?.name}
                address={activity?.address}
                review={activity?.review?.description}
                id={activity?.id}
                activityId={activity?.activityId}
                isPublic={activity?.isPublic}
                itineraryId={activity?.itineraryId}
                itineraryActivityObject={activity}
              />
            ))}
          </div>
        ) : (
          <div className="container">
            {searchedActivities.map((activity) => (
              <MyActivity
                key={`itineraryActivity--${activity?.id}`}
                description={activity?.description}
                address={activity?.address}
                review={activity?.review?.description}
                id={activity?.id}
                activityId={activity?.activityId}
                isPublic={activity?.isPublic}
                itineraryId={activity?.itineraryId}
                itineraryActivityObject={activity}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  const displayUsersActivitiesCount = () => {
    const userActivities = [];
    userItineraries.forEach((itinerary) => {
      itineraryActivities.forEach((activity) => {
        if (activity.itineraryId === itinerary.itineraryId) {
          userActivities.push(activity);
        }
      });
    });

    return userActivities.length;
  };

  const displayUsersFavoriteActivitiesCount = () => {
    const userFavoriteActivities = [];
    userItineraries.forEach((itinerary) => {
      itineraryActivities.forEach((activity) => {
        if (
          activity.itineraryId === itinerary.itineraryId &&
          activity.isFavorited === true
        ) {
          userFavoriteActivities.push(activity);
        }
      });
    });

    return userFavoriteActivities.length;
  };

  const displayFilteredFavoriteActivities = () => {

    const userActivities = [];
    userItineraries.forEach((itinerary) => {
      itineraryActivities.forEach((activity) => {
        if (activity.itineraryId === itinerary.itineraryId) {
          userActivities.push(activity);
        }
      });
    });
    return (
      <>
      {searchTermState === "" ? (
          <div className="container">
            {userActivities.map((activity) => (
              <MyFavoriteActivity
                key={`itineraryActivity--${activity?.id}`}
                description={activity?.description}
                activity={activity?.activity?.name}
                address={activity?.address}
                review={activity?.review?.description}
                id={activity?.id}
                activityId={activity?.activityId}
                isPublic={activity?.isPublic}
                itineraryId={activity?.itineraryId}
                itineraryActivityObject={activity}
                isFavorited={activity?.isFavorited}
              />
            ))}
          </div>
        ) : (
          <div className="container">
            {searchedActivities.map((activity) => (
              <MyFavoriteActivity
                key={`itineraryActivity--${activity?.id}`}
                description={activity?.description}
                address={activity?.address}
                review={activity?.review?.description}
                id={activity?.id}
                activityId={activity?.activityId}
                isPublic={activity?.isPublic}
                itineraryId={activity?.itineraryId}
                itineraryActivityObject={activity}
                isFavorited={activity?.isFavorited}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <>
    <main className="activitypagecontainer">
      <Card>
        <Tabs variant="pills" color="violet" defaultValue="all">
          <Tabs.List>
            <Tabs.Tab
              rightSection={
                <Badge color="violet">{displayUsersActivitiesCount()}</Badge>
              }
              value="all"
              icon={<IconPlaneInflight size={14} />}
            >
              All Activities
            </Tabs.Tab>
            <Tabs.Tab
              rightSection={
                <Badge color="violet">
                  {displayUsersFavoriteActivitiesCount()}
                </Badge>
              }
              value="favorites"
              icon={<IconStar size={14} />}
            >
              Favorite Activities
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="all" pt="xs">
            {displayFilteredActivities()}
          </Tabs.Panel>

          <Tabs.Panel value="favorites" pt="xs">
            {displayFilteredFavoriteActivities()}
          </Tabs.Panel>
        </Tabs>
      </Card>
      </main>
    </>
  );
};
