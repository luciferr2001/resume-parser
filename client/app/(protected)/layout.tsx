import { SessionProvider } from "next-auth/react";
import React from "react";

import { auth } from "@/auth";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
    const session=await auth();
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ProtectedLayout;
