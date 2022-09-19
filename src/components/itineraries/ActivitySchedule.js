import { Link } from "react-router-dom"


export const ActivitySchedule = ({itineraryActivityObject, activity, activityDescription, activityAddress, activityDateTime}) => {




    return <section class="scheduleitem">
    <div>{activity}</div>
    <div>{activityDescription}</div>
    <div>Where:{activityAddress}</div>
    <div>When: {activityDateTime}</div>
    <button>Delete Activity</button>
    <Link to="">Edit Activity</Link>
    </section>
}