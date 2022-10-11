import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Timeline, Text, Card, Menu, Badge, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconStar, IconDots, IconTrash } from "@tabler/icons";
import { openConfirmModal } from "@mantine/modals";
import "./activities.css";

// This component handles the creation of the activity schedule. Props are being passed from IndividualTripDetails component to this component, using deconstruction.
export const ActivitySchedule = ({
  itineraryActivityObject,
  activity,
  activityDescription,
  activityAddress,
  activityDateTime,
  setItineraryActivities,
  id,
  itineraryId,
  isComplete,
  isFavorited,
  review,
  isPublic,
}) => {
  const [userFullName, setFullName] = useState({});

  const navigate = useNavigate();

  const [itineraryActivity, updateItineraryActivity] = useState({
    itineraryId: 0,
    activityId: 0,
    description: "",
    address: "",
    activityDateTime: "",
    review: {
      rating: 0,
      description: "",
    },
    isPublic: false,
    isComplete: false,
    reviewIdentity: "",
    flags: ""
  });

  const localAppUser = localStorage.getItem("travelbuddy_user");
  const appUserObject = JSON.parse(localAppUser);

// This useEffect hook fetches the current user Data and the setterFunction stores the data in userFullName.
useEffect(() => {
    fetch(`http://localhost:8099/users/${appUserObject?.id}`)
      .then((res) => res.json())
      .then((currentUser) => {
        setFullName(currentUser);
      });
  }, []);

  // This useEffect hook fetches the specific itinerary Activity to where we will make the put request.
  useEffect(() => {
    fetch(`http://localhost:8099/itineraryActivities/${id}`)
      .then((res) => res.json())
      .then((itineraryActivityToEdit) => {
        updateItineraryActivity(itineraryActivityToEdit);
      });
  }, []);

  // This function will get all ItineraryActivities for the user. This function will be used in fetch an updated List of itineraryActivities after a put request is made to the API.
  const getItineraryActivitiesForUser = () => {
    fetch(
      `http://localhost:8099/itineraryActivities?_expand=activity&itineraryId=${itineraryId}`
    )
      .then((res) => res.json())
      .then((userItineraryActivitiesArray) => {
        setItineraryActivities(userItineraryActivitiesArray);
      });
  };


// This function will run when the menu delete trip button is clicked. User will be prompted with a modal (popup) to confirm or cancel their action.
  const deleteActivityConfirmation = () => {
     openConfirmModal({
       title: "Are you sure you want to delete your activity?",
       children: (
         <Text size="sm">Please click confirm or cancel to proceed.</Text>
       ),
       labels: { confirm: "Confirm", cancel: "Cancel" },
       onCancel: () => "",
       onConfirm: () => deleteActivityRequest(),
     });
 };

// If the confirm button is clicked in deleteTripConfirmation, then the deleteTripRequest function will run.
   const deleteActivityRequest = () => {
     return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
       method: "DELETE",
     })
       .then(() => {
         getItineraryActivitiesForUser();
       })
       .then(() => {
         showNotification({
           title: "Notification",
           message: "Your activity has been deleted.",
         });
       });
   };

   // This function renders the delete button and when clicked, will delete an itinerary.
  const completeActivityOnClick = () => {
    return (
      <Button
        variant="light"
        color="violet"
        onClick={(event) => {
          completeActivityStatusPut(event);
        }}
      >
        Complete Activity
      </Button>
    );
  };

  const shareActivityOnClick = () => {
    return (
      <>
        {isPublic ? (
          <Button
            variant="light"
            color="violet"
            onClick={(event) => {
              makeActivityPrivateStatusPut(event);
            }}
          >
            Make Review Private
          </Button>
        ) : (
          <Button
            variant="light"
            color="violet"
            onClick={(event) => {
              shareActivityStatusPut(event);
            }}
          >
            Share Review
          </Button>
        )}
      </>
    );
  };

  const completeActivityStatusPut = (event) => {
    const itineraryActivityPutToApi = {
      itineraryId: itineraryActivity.itineraryId,
      activityId: itineraryActivity.activityId,
      description: itineraryActivity.description,
      address: itineraryActivity.address,
      activityDateTime: itineraryActivity.activityDateTime,
      review: {
        rating: itineraryActivity.review.rating,
        description: itineraryActivity.review.description,
      },
      isPublic: itineraryActivity.isPublic,
      isComplete: true,
      isFavorited: itineraryActivity.isFavorited,
      reviewIdentity: itineraryActivity.reviewIdentity,
      flags: itineraryActivity.flags
    };

    return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryActivityPutToApi),
    })
      .then((res) => res.json())
      .then(() => {
        getItineraryActivitiesForUser();
      })
      .then(() => {
        showNotification({
          title: "Notification",
          message: "Your activity has been completed.",
        });
      });
  };

  const shareActivityStatusPut = (event) => {
    const itineraryActivityPutToApi = {
      itineraryId: itineraryActivity.itineraryId,
      activityId: itineraryActivity.activityId,
      description: itineraryActivity.description,
      address: itineraryActivity.address,
      activityDateTime: itineraryActivity.activityDateTime,
      review: {
        rating: itineraryActivity.review.rating,
        description: itineraryActivity.review.description,
      },
      isPublic: true,
      isComplete: itineraryActivity.isComplete,
      isFavorited: itineraryActivity.isFavorited,
      reviewIdentity: userFullName.fullName,
    };

    return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryActivityPutToApi),
    })
      .then((res) => res.json())
      .then(() => {
        getItineraryActivitiesForUser();
      })
      .then(() => {
        showNotification({
          title: "Notification",
          message: "Your activity review is now public!",
        });
      });
  };


  const makeActivityPrivateStatusPut = (event) => {
    const itineraryActivityPutToApi = {
      itineraryId: itineraryActivity.itineraryId,
      activityId: itineraryActivity.activityId,
      description: itineraryActivity.description,
      address: itineraryActivity.address,
      activityDateTime: itineraryActivity.activityDateTime,
      review: {
        rating: itineraryActivity.review.rating,
        description: itineraryActivity.review.description,
      },
      isPublic: false,
      isComplete: itineraryActivity.isComplete,
      isFavorited: itineraryActivity.isFavorited,
      reviewIdentity: ""
    };

    return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryActivityPutToApi),
    })
      .then((res) => res.json())
      .then(() => {
        getItineraryActivitiesForUser();
      })
      .then(() => {
        showNotification({
          title: "Notification",
          message: "Your activity review is now private.",
        });
      });
  };

  const favoriteActivityStatusPut = (event) => {
    const itineraryActivityPutToApi = {
      itineraryId: itineraryActivity.itineraryId,
      activityId: itineraryActivity.activityId,
      description: itineraryActivity.description,
      address: itineraryActivity.address,
      activityDateTime: itineraryActivity.activityDateTime,
      review: {
        rating: itineraryActivity.review.rating,
        description: itineraryActivity.review.description,
      },
      isPublic: itineraryActivity.isPublic,
      isComplete: itineraryActivity.isComplete,
      isFavorited: true,
      reviewIdentity: userFullName.fullName,
    };

    return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryActivityPutToApi),
    })
      .then((res) => res.json())
      .then(() => {
        getItineraryActivitiesForUser();
      });
  };
// 
  const unfavoriteActivityStatusPut = (event) => {
    const itineraryActivityPutToApi = {
      itineraryId: itineraryActivity.itineraryId,
      activityId: itineraryActivity.activityId,
      description: itineraryActivity.description,
      address: itineraryActivity.address,
      activityDateTime: itineraryActivity.activityDateTime,
      review: {
        rating: itineraryActivity.review.rating,
        description: itineraryActivity.review.description,
      },
      isPublic: itineraryActivity.isPublic,
      isComplete: itineraryActivity.isComplete,
      isFavorited: false,
      reviewIdentity: userFullName.fullName,
    };

    return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryActivityPutToApi),
    })
      .then((res) => res.json())
      .then(() => {
        getItineraryActivitiesForUser();
      });
  };

  // Display different text depending on if the user has written any text for their review.
  const displayReviewButtonText = () => {
    if (review === "") {
      return "Leave a review!";
    } else {
      return "Edit Review";
    }
  };

  // Depending on the value of the isFavorited property, This function will render the button that will favorite the activity for the user, or it will unfavorite the activity for the user.
  const favoriteActivityOnClick = () => {
    return (
      <>
        {isFavorited ? (
          <Button
            variant="filled"
            color="yellow"
            onClick={(event) => {
            unfavoriteActivityStatusPut(event);
            }}
          >
            <IconStar /> Favorited
          </Button>
        ) : (
          <Button
            variant="filled"
            color="gray"
            onClick={(event) => {
              favoriteActivityStatusPut(event);
            }}
          >
            <IconStar />
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      {isComplete ? (
        <Timeline.Item>
          <div className="timelineitem">
            <Card withBorder shadow="md">
              <div className="timelineheader">
                <Menu withinPortal position="left-start" withArrow shadow="sm">
                  <Menu.Target>
                    <ActionIcon>
                      <IconDots size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<IconTrash size={14} />}
                      onClick={() => {
                        deleteActivityConfirmation();
                      }}
                      color="red"
                    >
                      Delete Trip
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                {favoriteActivityOnClick()}
              </div>
              <Badge color="green">Completed</Badge>
              <Text>{activity}</Text>
              <Text>{activityDescription}</Text>
              <div>Where: {activityAddress}</div>
              <div>When: {activityDateTime}</div>
              <Card.Section withBorder p="sm">
                <Button
                  color="violet"
                  variant="light"
                  onClick={() => {
                    navigate(`/trips/${id}/${itineraryId}/editActivity`);
                  }}
                >
                  <Text size="sm">Edit Activity</Text>
                </Button>
                <Button
                  color="violet"
                  onClick={() => {
                    navigate(`/trips/${id}/review`);
                  }}
                >
                  {displayReviewButtonText()}
                </Button>
                {shareActivityOnClick()}
              </Card.Section>
            </Card>
          </div>
        </Timeline.Item>
      ) : (
        <Timeline.Item>
          <div className="timelineitem">
            <Card withBorder shadow="md">
              <Menu withinPortal position="left-start" withArrow shadow="sm">
                <Menu.Target>
                  <ActionIcon>
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconTrash size={14} />}
                    onClick={() => {
                    deleteActivityConfirmation();
                    }}
                    color="red"
                  >
                    Delete Activity
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Text>{activity}</Text>
              <Text>{activityDescription}</Text>
              <div>Where:{activityAddress}</div>
              <div>When: {activityDateTime}</div>
              <Card.Section withBorder p="sm">
              <Button
                color="violet"
                onClick={() => {
                  navigate(`/trips/${id}/${itineraryId}/editActivity`);
                }}
              >
                <Text size="sm">Edit Activity</Text>
              </Button>
              {completeActivityOnClick()}
              </Card.Section>
            </Card>
          </div>
        </Timeline.Item>
      )}
    </>
  );
};
