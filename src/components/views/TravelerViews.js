import { Route, Routes, Outlet } from "react-router-dom";
import { IndividualTripDetails } from "../itineraries/IndividualTripDetails";
import { ItineraryForm } from "../itineraries/ItineraryForm";
import { MyTrips } from "../itineraries/MyTrips";
import { HomePageView } from "./TravelerHomePage";
import { EditItinerary } from "../itineraries/itineraryEdit";
import { EditActivity } from "../itineraries/ActivityEdit";
import { UserActivityReview } from "../itineraries/UserActivityReview"
import { CommunityPage } from "../community/Community"
import { Profile } from "../profile/Profile";
import { ActivityContainer } from "../profile/ActivityContainer";
import { ActivityReviewContainer } from "../community/ActivityReviewContainer";
import { MyActivities } from "../profile/MyActivities";

export const TravelerViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <HomePageView />

            <Outlet />
          </>
        }
      ></Route>

      <Route path="home" element={<HomePageView />} />

      <Route path="trips" element={<MyTrips />} />

      <Route path="createnewtrip" element={<ItineraryForm />} />

      <Route path="community" element={<CommunityPage />} />


      <Route path="community/reviews" element={<ActivityReviewContainer />} />

      <Route path="profile" element={<Profile />} />

      <Route path="profile/myactivities" element={<ActivityContainer />} />


      

    
      <Route
        path="trips/:usertripId/view"
        element={<IndividualTripDetails />}
      />

      <Route
        path="trips/:usertripId/editItinerary"
        element={<EditItinerary />}
      />

      <Route
        path="trips/:itineraryActivityId/:itineraryId/editActivity"
        element={<EditActivity />}
      />

      <Route path="trips/:itineraryActivityId/finishactivity" element={<UserActivityReview />} />
    </Routes>
  );
};
