"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
    const session = useCurrentUser();

    const logoutUser=()=>{
        signOut();
    }
    return (
        <div>
            {JSON.stringify(session)}
            <button onClick={logoutUser}>Sign Out</button>
        </div>
    );
};

export default SettingsPage;
