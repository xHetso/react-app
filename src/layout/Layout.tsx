import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation/Navigation";

export function Layout() {
    return <>
        <div>
            <Outlet />
        </div>
        <Navigation />
    </>;
}