'use client';
import { signOut } from "next-auth/react";

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { ActiveChallenge } from "@/types";
import { ResetIcon } from "@radix-ui/react-icons";

interface NavBarProps {
    username: string | undefined
    avatar: string
    challenge: ActiveChallenge | null
}

const NavBar: React.FC<NavBarProps> = ({username, avatar, challenge}) => {

    const fallbava = avatar && avatar ==='no-avatar' ? '/next.svg' : avatar

    return (
        <div className="w-full h-14 flex justify-between items-center gap-x-4 px-2 py-2 border-b">
            <div className="w-full flex justify-start items-center gap-x-4">
                <ModeToggle />
                <Avatar>
                    <AvatarImage src={fallbava} />
                </Avatar>
                <h1 className="">{username}</h1>
                {challenge ? (
                    <div className="w-full flex justify-center items-center gap-x-2">
                        <h1 className="hidden text-xl font-semibold sm:block">Challenge:</h1>
                        <h2 className="text-xl font-bold text-green-500 uppercase">{challenge.name}</h2>
                    </div>
                ) 
                    : 
                (
                    <h1 className="text-3xl font-bold">No Active Challenges</h1>
                    )}
                
            </div>
            <Button variant='default' type="button" onClick={() => signOut()} name='logout' aria-label="logout">
                <ResetIcon />
            </Button>
        </div>
    )
};

export default NavBar;