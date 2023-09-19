import { lazy, Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// MAIN
const DashboardComponent = lazy(() => import("../components/pages/dashboard/Dashboard-Component"));
const DashboardMainComponent = lazy(() => import("../components/pages/dashboard/dashboard-main/Dashboard-Main-Component"));

// USER
const DashboardUserComponent = lazy(() => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Component"));
const DashboardUserAddComponent = lazy(() => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Add-Component/Dashboard-User-Add-Component"));
const DashboardUserEditComponent = lazy(() => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Edit-Component/Dashboard-User-Edit-Component"));

// ROLE
const DashboardRolesComponent = lazy(() => import("../components/pages/dashboard/dashboard-roles/Dashboard-Roles-Component"));
const DashboardAddRoleComponent = lazy(() => import("../components/pages/dashboard/dashboard-roles/Dashboard-Add-Role-Component/Dashboard-Add-Role-Component"));
const DashboardEditRoleComponent = lazy(() => import("../components/pages/dashboard/dashboard-roles/Dashboard-Edit-Role-Component/Dashboard-Edit-Role-Component"));

// LOCATION
const DashboardLocationComponent = lazy(() => import("../components/pages/dashboard/dashboard-location/Dashboard-Location-Component"));
const DashboardAddLocationComponent = lazy(() => import("../components/pages/dashboard/dashboard-location/Dashboard-Add-Location-Component/Dashboard-Add-Location-Component"));
const DashboardEditLocationComponent = lazy(() => import("../components/pages/dashboard/dashboard-location/Dashboard-Edit-Location-Component/Dashboard-Edit-Location-Component"));

// CATEGORY
const DashboardCategoryComponent = lazy(() => import("../components/pages/dashboard/dashboard-category/Dashboard-Category-Component"));
const DashboardAddCategoryComponent = lazy(() => import("../components/pages/dashboard/dashboard-category/Dashboard-Add-Category-Component/Dashboard-Add-Category-Component"));
const DashboardEditCategoryComponent = lazy(() => import("../components/pages/dashboard/dashboard-category/Dashboard-Edit-Category-Component/Dashboard-Edit-Category-Component"));

// HOTEL
const DashboardHotelsComponent = lazy(() => import("../components/pages/dashboard/dashboard-hotel/Dashboard-Hotels-Component"));
const DashboardAddHotelComponent = lazy(() => import("../components/pages/dashboard/dashboard-hotel/Dashboard-Add-Hotel-Component/Dashboard-Add-Hotel-Component"));
const DashboardEditHotelComponent = lazy(() => import("../components/pages/dashboard/dashboard-hotel/Dashboard-Edit-Hotel-Component/Dashboard-Edit-Hotel-Component"));

// ROOM
const DashboardRoomsComponent = lazy(() => import("../components/pages/dashboard/dashboard-room/Dashboard-Rooms-Component"));
const DashboardAddRoomComponent = lazy(() => import("../components/pages/dashboard/dashboard-room/Dashboard-Add-Room-Component/Dashboard-Add-Room-Component"));
const DashboardEditRoomComponent = lazy(() => import("../components/pages/dashboard/dashboard-room/Dashboard-Edit-Room-Component/Dashboard-Edit-Room-Component"));

// AUTHORIZATION
const AuthComponent = lazy(() => import("../components/pages/auth/Auth-Component"));
const AuthSignInComponent = lazy(() => import("../components/pages/auth/Auth-Sign-In-Component/Auth-Sign-In-Component"));


const router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '',
                element: <Suspense fallback={<p>Loading...</p>}><DashboardComponent /></Suspense>,
                children: [
                    {
                        index: true,
                        loader: () => import("../components/pages/dashboard/dashboard-main/Dashboard-Main-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardMainComponent /></Suspense>
                    },
                    // USER
                    {
                        path: 'users',
                        loader: () => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardUserComponent /></Suspense>
                    },
                    {
                        path: 'new-user',
                        loader: () => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Add-Component/Dashboard-User-Add-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardUserAddComponent /></Suspense>
                    },
                    {
                        path: 'edit-user/:user',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-user/Dashboard-User-Edit-Component/Dashboard-User-Edit-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardUserEditComponent /></Suspense>
                    },
                    // LOCATION
                    {
                        path: 'locations',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-location/Dashboard-Location-Component").then(m => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardLocationComponent /></Suspense>
                    },
                    {
                        path: "new-location",
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddLocationComponent /></Suspense>
                    },
                    {
                        path: 'edit-location/:location',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-location/Dashboard-Edit-Location-Component/Dashboard-Edit-Location-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardEditLocationComponent /></Suspense>
                    },

                    // CATEGORY
                    {
                        path: "categorys",
                        loader: () => import("../components/pages/dashboard/dashboard-category/Dashboard-Category-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardCategoryComponent /></Suspense>
                    },
                    {
                        path: "new-category",
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddCategoryComponent /></Suspense>
                    },
                    {
                        path: "edit-category/:category",
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-category/Dashboard-Edit-Category-Component/Dashboard-Edit-Category-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardEditCategoryComponent /></Suspense>
                    },

                    // HOTEL
                    {
                        path: 'hotels',
                        loader: () => import("../components/pages/dashboard/dashboard-hotel/Dashboard-Hotels-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardHotelsComponent /></Suspense>
                    },
                    {
                        path: 'new-hotel',
                        loader: () => import("../components/pages/dashboard/dashboard-hotel/Dashboard-Add-Hotel-Component/Dashboard-Add-Hotel-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddHotelComponent /></Suspense>
                    },
                    {
                        path: 'edit-hotel/:hotelId',
                        loader: ({request, params}) =>
                            import("../components/pages/dashboard/dashboard-hotel/Dashboard-Edit-Hotel-Component/Dashboard-Edit-Hotel-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardEditHotelComponent /></Suspense>
                    },

                    // ROOM
                    {
                        path: 'rooms',
                        loader: () => import("../components/pages/dashboard/dashboard-room/Dashboard-Rooms-Component").then((m) => m.loader()),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardRoomsComponent /></Suspense>
                    },
                    {
                        path: 'new-room',
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddRoomComponent /></Suspense>
                    },
                    {
                        path: 'edit-room/:room',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-room/Dashboard-Edit-Room-Component/Dashboard-Edit-Room-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardEditRoomComponent /></Suspense>
                    },
                    // ROLE
                    {
                        path: 'roles',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-roles/Dashboard-Roles-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardRolesComponent /></Suspense>
                    },
                    {
                        path: 'new-role',
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardAddRoleComponent /></Suspense>
                    },
                    {
                        path: 'edit-role/:role',
                        loader: ({request, params}) => import("../components/pages/dashboard/dashboard-roles/Dashboard-Edit-Role-Component/Dashboard-Edit-Role-Component").then((m) => m.loader(request, params)),
                        element: <Suspense fallback={<p>Loading...</p>}><DashboardEditRoleComponent /></Suspense>
                    }
                ]
            }
        ]
    },
    {
        path: "auth",
        element: <Suspense fallback={<p>Loading...</p>}><AuthComponent /></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<p>Loading...</p>}><AuthSignInComponent /></Suspense>
            }
        ]
    }
])

export default router;