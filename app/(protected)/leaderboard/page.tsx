import LeaderboardComp from "../../../components/leaderboard/Leaderboard";
import { getTotalStats } from "../../../lib/database/data/actions-get";

export default async function LeaderboardPage () {

    const data = await getTotalStats();

    return (

        <LeaderboardComp impData={data ?? []} />

    )
}