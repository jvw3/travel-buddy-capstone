import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Text, Textarea, Card, NumberInput } from "@mantine/core";
import { IconStar } from "@tabler/icons";

export const ActivityReview = () => {
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
      <h1 className="finishactivityheader">
        Review of {itineraryActivity?.description}-
      </h1>
      <h2 className="finishactivityheader">
        Located at: {itineraryActivity?.address}
      </h2>
      <Text></Text>
      <Card withBorder>
        <form>
          <fieldset>
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
          <Button onClick={(event) => activityReviewPutRequest(event)}>
            Submit Review
          </Button>
        </form>
      </Card>
    </>
  );
};

/* <fieldset>
  <NumberInput
    label="Rating (0-10 scale)"
    description="Decimals can be used in ratings."
    type="number"
    withAsterisk
    value={itineraryActivity?.review?.rating}
    onChange={(evt) => {
      const copy = { ...itineraryActivity };
      copy.review.rating = evt.target.value;
      updateItineraryActivity(copy);
    }}
  />
</fieldset>; */
