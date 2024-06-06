import { Navigate, Route, Routes } from "react-router-dom"
import { ProtectedDashboardRoutes, ProtectedRoutes, PublicRoutes } from "."
import { LoginPage, NotFoundPage, RegisterPage } from "../pages";
import { useAppSelector } from "../redux/store/hooks";
import { ClubesPage } from "../pages/Clubes/ClubesPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { MyClubPage } from "../pages/MiClub/MyClubPage";

export interface IRoute {
    path:string,
    label: string,
    element: JSX.Element,
    permissions: string[]
}
export const protectedRoutes: IRoute[] = [
    {path:"", label:"", element: <Navigate to="/home" />, permissions: []},
    // {path:"home", label:"Home", element: <HomePage />, permissions: []},
    {path:"profile", label:"Perfil", element: <ProfilePage />, permissions: ['Jugador']},
    {path:"mi-club", label:"Mi Club", element: <MyClubPage />, permissions: ['Director de club']},
    {path:"clubes", label:"Clubes", element: <ClubesPage />, permissions: ['Director de club', 'Jugador']},
]

export const AppRouter = () => {
    const user = useAppSelector((state) => state.auth.user);

    const hasPermission = (route: IRoute) => {
        if (route.permissions.length === 0) return true;
        return user?.roles.some(role => route.permissions.includes(role.name));
    };

    return (<Routes>
        <Route path="/" element={<PublicRoutes />} >
            <Route path="" element={<Navigate to="/login" />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<ProtectedRoutes />} >
            <Route path="" element={<ProtectedDashboardRoutes />} >
                {protectedRoutes.map((route, index) => 
                    hasPermission(route) && <Route key={index} path={route.path} element={route.element} />
                )}
            </Route>
        </Route>
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
    )
}