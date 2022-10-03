
// import { useParams, useNavigate } from "react-router-dom";
// import { useState, useEffect} from "react"
// import { Card, Text, Button, Title } from "@mantine/core"
// import { showNotification } from "@mantine/notifications";



// export const ReportUser = () => {
// const {id} = useParams();

// const navigate = useNavigate()


//   useEffect(() => {
//    fetch(`http://localhost:8099/itineraryActivities/${id}`)
//      .then((res) => res.json())
//      .then((itineraryActivity) => {
//        updateItineraryActivity(itineraryActivity);
//      })
//  }, [id]);



//   const [itineraryActivity, updateItineraryActivity] = useState({
//     itineraryId: 0,
//     activityId: 0,
//     description: "",
//     address: "",
//     activityDateTime: "",
//     review: {
//       rating: 0,
//       description: "",
//     },
//     isPublic: false,
//     isComplete: false,
//     reviewIdentity: "",
//     flags: {
//       hatespeech: "",
//       profanity: "",
//       bullying: ""
//     },
//   });


//       const reportUserPutRequest = (event) => {

//     return fetch(`http://localhost:8099/itineraryActivities/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(itineraryActivity),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         showNotification({
//           title: "Notification",
//           message: "Your activity has been completed.",
//         });
//       })
//       .then(() => {
//         navigate(-1);
//       });
//   };
 
// const reportUser = () => {
//     return (
//       <Button
//         color="red"
//         onClick={(event) => {
//           reportUserPutRequest(event)
//         }}
//       >
//         Report User
//       </Button>
//     );
// }

//     return <>
//     <Title>Report User</Title>
//     <Card className="reportcard">
//         <Text>{itineraryActivity?.reviewIdentity}</Text>
//         <Text>{itineraryActivity?.review?.description}</Text>
//         <form>
//         <fieldset>
//           <div className="form-group">
//             <label htmlFor="name">Choose Activity:</label>
//             <select
//               className="form-control"
//               value={itineraryActivity?.flags.hatespeech}
//               required
//               autoFocus
//               onChange={(evt) => {
//                 const copy = { ...itineraryActivity };
//                 copy.flags.hatespeech = itineraryActivity?.flags.hatespeech + 1;
//                 updateItineraryActivity(copy);
//               }}
//             >
//               <option >Choose your Activity</option>
//               <option >Hateful Speech</option>
//               <option >Profanity</option>
//               <option >Bullying</option>
//             </select>
//           </div>
//         </fieldset>
//         </form>
//         {reportUser()}

//     </Card>
//     </>

// }


