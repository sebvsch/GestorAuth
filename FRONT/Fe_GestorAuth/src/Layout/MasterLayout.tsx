import { Outlet } from "react-router-dom";
import { SideMenu } from "../Components/SideMenu/SideMenu";

const MasterLayout = () => {
    return (
        <>
            <div className="flex">
                <div>
                    <SideMenu />
                </div >
                <div className="flex-1">
                    <Outlet />
                </div>
            </div >
        </>
    );
}

export { MasterLayout };
