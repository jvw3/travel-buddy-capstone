import { Route, Routes, Outlet } from "react-router-dom"
import { AdminReviewContainer } from "../community/AdminReviewContainer"
import { AdminUserSettings } from "../community/AdminUserSettings";
import { UserList } from "../community/AdminUsersList";

// This component is responsible for displaying all of the possible views for the admin.
export const AdminView = () => {
	return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <AdminReviewContainer />

            <Outlet />
          </>
        }
      ></Route>

      <Route path="allusers" element={<UserList/>} />

      <Route path="userinfo/:id" element={<AdminUserSettings/>} />
    </Routes>




  );
}