import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const EditActivity = () => {

    const { itineraryActivityId } = useParams();
    const { itineraryId } = useParams();
    const [activities, setActivities] = useState([])

const navigate = useNavigate()

    const [itineraryActivity, updateItineraryActivity] = useState({

        itineraryId: 0,
        activityId: 0,
        description: "",
        address: "",
        activityDateTime: "",
        rating: "",
        review: "",
        isPublic: false,
        isComplete: false
    })


    useEffect(() => {
      fetch(`http://localhost:8099/itineraryActivities/${itineraryActivityId}`)
        .then((res) => res.json())
        .then(
          // TicketData will already be an object instead of an array so we don't need to get it at index 0.
          (itineraryActivityData) => {
            updateItineraryActivity(itineraryActivityData);
          }
        );
    }, [itineraryActivityId]);


     useEffect(() => {
       fetch(`http://localhost:8099/activities`)
         .then((res) => res.json())
         .then((activitiesData) => {
           setActivities(activitiesData);
         });
     }, []);


    const itineraryActivityPutRequest = (event) => {
      event.preventDefault();

      return (
        fetch(
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

          .then(
            () => {
                navigate(-1);
            })
      );
    };






    return (
      <form>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Choose Activity:</label>
            <select
              className="form-control"
              value={itineraryActivity?.activityId}
              required
              autoFocus
              onChange={(evt) => {
                const copy = { ...itineraryActivity };
                copy.activityId = parseInt(evt.target.value);
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
          <div className="departure">
            <label htmlFor="description">Description:</label>
            <input
              required
              autoFocus
              className="form-control"
              type="text"
              value={itineraryActivity?.description}
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
              required
              autoFocus
              className="form-control"
              type="datetime-local"
              value={itineraryActivity?.activityDateTime}
              onChange={(evt) => {
                const copy = { ...itineraryActivity };
                copy.activityDateTime = evt.target.value;
                updateItineraryActivity(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="departure">
            <label htmlFor="description">Activity Address:</label>
            <input
              required
              autoFocus
              className="form-control"
              type="text"
              value={itineraryActivity?.address}
              onChange={(evt) => {
                const copy = { ...itineraryActivity };
                copy.address = evt.target.value;
                updateItineraryActivity(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset></fieldset>
        <button
        onClick={(clickEvent) => itineraryActivityPutRequest(clickEvent)}
          className="btn btn-primary"
          
        >
          Save Changes!
        </button>
      </form>
    );
    
}