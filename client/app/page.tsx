import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-sky-500">
            <div className="flex text-center space-y-6 flex-col">
                <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>Auth</h1>
                <LoginButton>
                    <Button variant="secondary">Sign In</Button>
                </LoginButton>
            </div>
        </main>
    );
}
