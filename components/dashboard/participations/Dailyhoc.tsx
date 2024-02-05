import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "../../../app/api/auth/[...nextauth]/options";
import { getDailyStats } from "../../../lib/database/data/actions-get"
import DailyparticipationComp from "./Dailyclient";

const DailyPHoc = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/dashboard')
    }

    const dailyInfo = await getDailyStats(session?.user.id);
    
    return (
        <>
            <DailyparticipationComp userId={session?.user.id} dailyInfo={dailyInfo}/>
        </>
    )
};

export default DailyPHoc;