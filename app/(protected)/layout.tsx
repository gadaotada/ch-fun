import { getServerSession } from "next-auth"

import { authOptions } from "../api/auth/[...nextauth]/options"
import { getActiveChallenge } from '../../lib/database/data/actions-get';
import NavBar from "../../components/ui/navigation/navbar"

export default async function MainLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const session = await getServerSession(authOptions);
    const challenge = await getActiveChallenge();

    return (
        <>  
            <NavBar username={session?.user.name} avatar={session?.user.avatar ?? 'no-avatar'} challenge={challenge}/>
            {children}
        </>
    )

}