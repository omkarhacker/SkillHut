
import { Button } from "@/components/ui/button"
import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/auth"
import { AuthContext } from "./context/auth-context";
import { useContext } from "react";
import RouteGuard from "./components/route-guard";
import StudentHomePage from "./pages/student/home";
import StudentViewCommonLayout from "./components/student-view/student-view";
import InstructorDashboardpage from "./pages/instructor";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";
function App() {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
        <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
         <Route path="" element={<StudentHomePage />} />
         <Route path="home" element={<StudentHomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
