import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Text, Textarea, Card, Title } from "@mantine/core";
import "./activities.css";

export const UserActivityReview = () => {
  const { itineraryActivityId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8099/itineraryActivities?id=${itineraryActivityId}`)
      .then((res) => res.json())
      .then((myActivity) => {
        const activityToReview = myActivity[0];
        updateItineraryActivity(activityToReview);
      });
  }, [itineraryActivityId]);

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
  });

  const activityReviewPutRequest = (event) => {
    event.preventDefault();

    return fetch(
      `http://localhost:8099/itineraryActivities/${itineraryActivityId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itineraryActivity),
      }
    )
      .then((res) => res.json())

      .then(() => {
        navigate(-1);
      });
  };

  return (
    <>
    <main className="activityreviewcontainer">
      <Title className="finishactivityheader">
         {itineraryActivity?.description} Review
      </Title>
      <Card className="reviewcard" withBorder>
        <form>
          <fieldset>
            <Text>
        Address: {itineraryActivity?.address}
      </Text>
            <Textarea
              autoFocus
              withAsterisk
              label="Leave a review!"
              description="How was your experience?"
              type="text"
              value={itineraryActivity?.review?.description}
              onChange={(evt) => {
                const copy = { ...itineraryActivity };
                copy.review.description = evt.target.value;
                updateItineraryActivity(copy);
              }}
            />
          </fieldset>
          <Button color="violet" onClick={(event) => activityReviewPutRequest(event)}>
            Save Review
          </Button>
        </form>
      </Card>
      </main>
    </>
  );
};


