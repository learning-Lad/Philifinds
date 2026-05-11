import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ItineraryBuilder from "./pages/ItineraryBuilder";
import ItineraryView from "./pages/ItineraryView";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminEmergency from "./pages/admin/AdminEmergency";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/itinerary/new",
    Component: ItineraryBuilder,
  },
  {
    path: "/itinerary/:id",
    Component: ItineraryView,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: AdminOverview,
      },
      {
        path: "analytics",
        Component: AdminAnalytics,
      },
      {
        path: "emergency",
        Component: AdminEmergency,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
