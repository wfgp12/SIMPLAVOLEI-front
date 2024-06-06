import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store/hooks";
import { PublicLayout } from "../components";

export const PublicRoutes = () => {
    let auth = useAppSelector(state => state.auth)
    let location = useLocation();

    return (auth.isAuth)
        ? <Navigate to="/home" state={{ from: location }} replace />
        : <PublicLayout>
            <Outlet />
        </PublicLayout>
}